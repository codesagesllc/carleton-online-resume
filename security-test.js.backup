#!/usr/bin/env node

/**
 * Security Testing Script for Carleton Online Resume
 * Tests security headers, rate limiting, validation, and vulnerability fixes
 * 
 * Usage: node security-test.js [base-url]
 * Example: node security-test.js http://localhost:3000
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const TEST_RESULTS = [];

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Test utilities
class SecurityTester {
  static async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);
      const isHttps = parsedUrl.protocol === 'https:';
      const client = isHttps ? https : http;

      const requestOptions = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (isHttps ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'SecurityTester/1.0',
          ...options.headers,
        },
        timeout: 10000,
      };

      const req = client.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (options.body) {
        req.write(options.body);
      }

      req.end();
    });
  }

  static logTest(name, passed, details = '') {
    const color = passed ? colors.green : colors.red;
    const status = passed ? '✓ PASS' : '✗ FAIL';
    console.log(`${color}${status}${colors.reset} ${name}`);
    if (details) {
      console.log(`    ${details}`);
    }
    
    TEST_RESULTS.push({ name, passed, details });
  }

  static logInfo(message) {
    console.log(`${colors.blue}ℹ INFO${colors.reset} ${message}`);
  }

  static logWarning(message) {
    console.log(`${colors.yellow}⚠ WARN${colors.reset} ${message}`);
  }
}

// Test suites
class SecurityTests {
  static async testSecurityHeaders() {
    console.log(`\n${colors.cyan}=== Security Headers Tests ===${colors.reset}`);
    
    try {
      const response = await SecurityTester.makeRequest(BASE_URL);
      const headers = response.headers;

      // Test required security headers
      const requiredHeaders = {
        'strict-transport-security': 'HSTS header',
        'x-frame-options': 'Clickjacking protection',
        'x-content-type-options': 'MIME type sniffing protection',
        'x-xss-protection': 'XSS protection',
        'content-security-policy': 'Content Security Policy',
        'referrer-policy': 'Referrer policy',
      };

      Object.entries(requiredHeaders).forEach(([header, description]) => {
        const exists = header in headers;
        SecurityTester.logTest(
          `Security header: ${header}`,
          exists,
          exists ? `Value: ${headers[header]}` : `Missing ${description}`
        );
      });

      // Test that X-Powered-By is not exposed
      SecurityTester.logTest(
        'X-Powered-By header hidden',
        !headers['x-powered-by'],
        headers['x-powered-by'] ? 'Header exposed, should be hidden' : 'Properly hidden'
      );

    } catch (error) {
      SecurityTester.logTest('Security headers test', false, `Error: ${error.message}`);
    }
  }

  static async testRateLimiting() {
    console.log(`\n${colors.cyan}=== Rate Limiting Tests ===${colors.reset}`);
    
    try {
      const contactUrl = `${BASE_URL}/api/contact`;
      let rateLimitHit = false;
      
      SecurityTester.logInfo('Testing rate limiting (may take a moment)...');
      
      // Make multiple requests quickly to trigger rate limiting
      for (let i = 0; i < 10; i++) {
        try {
          const response = await SecurityTester.makeRequest(contactUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Origin': BASE_URL,
            },
            body: JSON.stringify({
              name: `Test ${i}`,
              email: `test${i}@example.com`,
              message: `Test message ${i} that is long enough to pass validation`,
            }),
          });

          if (response.statusCode === 429) {
            rateLimitHit = true;
            break;
          }
          
          // Small delay between requests
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          // Continue testing even if individual requests fail
        }
      }

      SecurityTester.logTest(
        'Rate limiting active',
        rateLimitHit,
        rateLimitHit ? 'Rate limiting triggered successfully' : 'Rate limit not reached in test'
      );

    } catch (error) {
      SecurityTester.logTest('Rate limiting test', false, `Error: ${error.message}`);
    }
  }

  static async testInputValidation() {
    console.log(`\n${colors.cyan}=== Input Validation Tests ===${colors.reset}`);
    
    const testCases = [
      {
        name: 'SQL injection attempt',
        payload: { name: "'; DROP TABLE contacts; --", email: 'test@test.com', message: 'This is a test message' },
        shouldFail: true,
      },
      {
        name: 'XSS attempt in name',
        payload: { name: '<script>alert("xss")</script>', email: 'test@test.com', message: 'This is a test message' },
        shouldFail: true,
      },
      {
        name: 'Invalid email format',
        payload: { name: 'Test User', email: 'invalid-email', message: 'This is a test message' },
        shouldFail: true,
      },
      {
        name: 'Short message',
        payload: { name: 'Test User', email: 'test@test.com', message: 'hi' },
        shouldFail: true,
      },
      {
        name: 'Valid input',
        payload: { name: 'Test User', email: 'test@test.com', message: 'This is a valid test message' },
        shouldFail: false,
      },
    ];

    for (const testCase of testCases) {
      try {
        const response = await SecurityTester.makeRequest(`${BASE_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': BASE_URL,
          },
          body: JSON.stringify(testCase.payload),
        });

        const failed = response.statusCode >= 400;
        const passed = testCase.shouldFail ? failed : !failed;
        
        SecurityTester.logTest(
          testCase.name,
          passed,
          `Status: ${response.statusCode}, Expected to ${testCase.shouldFail ? 'fail' : 'succeed'}`
        );

      } catch (error) {
        SecurityTester.logTest(testCase.name, testCase.shouldFail, `Error: ${error.message}`);
      }

      // Small delay between validation tests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  static async testOriginValidation() {
    console.log(`\n${colors.cyan}=== Origin Validation Tests ===${colors.reset}`);
    
    const testCases = [
      {
        name: 'Valid origin',
        origin: BASE_URL,
        shouldPass: true,
      },
      {
        name: 'Invalid origin',
        origin: 'https://malicious.com',
        shouldPass: false,
      },
      {
        name: 'No origin header',
        origin: null,
        shouldPass: false,
      },
    ];

    for (const testCase of testCases) {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        if (testCase.origin) {
          headers['Origin'] = testCase.origin;
        }

        const response = await SecurityTester.makeRequest(`${BASE_URL}/api/contact`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@test.com',
            message: 'Test message for origin validation',
          }),
        });

        const passed = testCase.shouldPass ? response.statusCode < 400 : response.statusCode >= 400;
        
        SecurityTester.logTest(
          testCase.name,
          passed,
          `Status: ${response.statusCode}, Origin: ${testCase.origin || 'none'}`
        );

      } catch (error) {
        SecurityTester.logTest(testCase.name, !testCase.shouldPass, `Error: ${error.message}`);
      }

      // Small delay between origin tests
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  static async testSuspiciousPathBlocking() {
    console.log(`\n${colors.cyan}=== Suspicious Path Blocking Tests ===${colors.reset}`);
    
    const suspiciousPaths = [
      '/wp-admin/',
      '/admin/',
      '/.env',
      '/config.php',
      '/test.php',
      '/backup/',
      '/.git/',
    ];

    for (const path of suspiciousPaths) {
      try {
        const response = await SecurityTester.makeRequest(`${BASE_URL}${path}`);
        
        const blocked = response.statusCode === 404 || response.statusCode === 403;
        SecurityTester.logTest(
          `Suspicious path blocked: ${path}`,
          blocked,
          `Status: ${response.statusCode}`
        );

      } catch (error) {
        SecurityTester.logTest(
          `Suspicious path blocked: ${path}`,
          true,
          `Blocked with error: ${error.message}`
        );
      }

      // Small delay between path tests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  static async testHTTPSRedirect() {
    console.log(`\n${colors.cyan}=== HTTPS Redirect Tests ===${colors.reset}`);
    
    if (BASE_URL.startsWith('https://')) {
      SecurityTester.logInfo('Testing HTTPS redirect (checking HTTP version)...');
      
      try {
        const httpUrl = BASE_URL.replace('https://', 'http://');
        const response = await SecurityTester.makeRequest(httpUrl);
        
        const hasRedirect = response.statusCode >= 300 && response.statusCode < 400;
        const locationHeader = response.headers.location;
        const redirectsToHttps = locationHeader && locationHeader.startsWith('https://');
        
        SecurityTester.logTest(
          'HTTP to HTTPS redirect',
          hasRedirect && redirectsToHttps,
          hasRedirect ? `Redirects to: ${locationHeader}` : 'No redirect found'
        );

      } catch (error) {
        SecurityTester.logTest('HTTP to HTTPS redirect', false, `Error: ${error.message}`);
      }
    } else {
      SecurityTester.logInfo('Skipping HTTPS redirect test (base URL is HTTP)');
    }
  }

  static async testDependencyVulnerabilities() {
    console.log(`\n${colors.cyan}=== Dependency Vulnerability Tests ===${colors.reset}`);
    
    const { execSync } = require('child_process');
    
    try {
      // Run npm audit and capture output
      const auditResult = execSync('npm audit --json', { 
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      const auditData = JSON.parse(auditResult);
      const vulnerabilityCount = auditData.metadata?.vulnerabilities?.total || 0;
      
      SecurityTester.logTest(
        'No dependency vulnerabilities',
        vulnerabilityCount === 0,
        vulnerabilityCount > 0 ? 
          `Found ${vulnerabilityCount} vulnerabilities` : 
          'All dependencies are secure'
      );
      
      if (vulnerabilityCount > 0) {
        const levels = auditData.metadata.vulnerabilities;
        SecurityTester.logWarning(
          `Vulnerabilities by severity: Critical: ${levels.critical}, High: ${levels.high}, Moderate: ${levels.moderate}, Low: ${levels.low}`
        );
      }

    } catch (error) {
      if (error.status === 1) {
        // npm audit returns exit code 1 when vulnerabilities are found
        try {
          const auditData = JSON.parse(error.stdout);
          const vulnerabilityCount = auditData.metadata?.vulnerabilities?.total || 0;
          
          SecurityTester.logTest(
            'No dependency vulnerabilities',
            false,
            `Found ${vulnerabilityCount} vulnerabilities - run 'npm audit fix'`
          );
        } catch (parseError) {
          SecurityTester.logTest(
            'Dependency vulnerability check',
            false,
            `Error parsing audit results: ${parseError.message}`
          );
        }
      } else {
        SecurityTester.logTest(
          'Dependency vulnerability check',
          false,
          `Error running npm audit: ${error.message}`
        );
      }
    }
  }

  static async testResponseHeaders() {
    console.log(`\n${colors.cyan}=== Response Header Security Tests ===${colors.reset}`);
    
    try {
      const response = await SecurityTester.makeRequest(BASE_URL);
      const headers = response.headers;
      
      // Test for sensitive information disclosure
      const sensitiveHeaders = [
        'server',
        'x-powered-by',
        'x-aspnet-version',
        'x-aspnetmvc-version',
      ];
      
      let exposedHeaders = [];
      sensitiveHeaders.forEach(header => {
        if (headers[header]) {
          exposedHeaders.push(`${header}: ${headers[header]}`);
        }
      });
      
      SecurityTester.logTest(
        'No sensitive headers exposed',
        exposedHeaders.length === 0,
        exposedHeaders.length > 0 ? 
          `Exposed: ${exposedHeaders.join(', ')}` : 
          'All sensitive headers properly hidden'
      );
      
      // Test Content-Type header
      const hasContentType = headers['content-type'];
      SecurityTester.logTest(
        'Content-Type header present',
        !!hasContentType,
        hasContentType ? `Content-Type: ${hasContentType}` : 'Missing Content-Type header'
      );
      
      // Test cache headers for static resources
      const cacheControl = headers['cache-control'];
      SecurityTester.logTest(
        'Cache-Control header configured',
        !!cacheControl,
        cacheControl ? `Cache-Control: ${cacheControl}` : 'Missing Cache-Control header'
      );

    } catch (error) {
      SecurityTester.logTest('Response header tests', false, `Error: ${error.message}`);
    }
  }
}

// Performance and monitoring tests
class PerformanceTests {
  static async testResponseTimes() {
    console.log(`\n${colors.cyan}=== Performance Tests ===${colors.reset}`);
    
    const pages = [
      '/',
      '/contact',
      '/api/contact',
    ];
    
    for (const page of pages) {
      try {
        const startTime = Date.now();
        const response = await SecurityTester.makeRequest(`${BASE_URL}${page}`, {
          method: page.startsWith('/api/') ? 'OPTIONS' : 'GET', // Use OPTIONS for API to avoid side effects
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        const isGoodPerformance = responseTime < 3000; // 3 seconds threshold
        SecurityTester.logTest(
          `Response time for ${page}`,
          isGoodPerformance,
          `${responseTime}ms (${isGoodPerformance ? 'Good' : 'Slow'})`
        );

      } catch (error) {
        SecurityTester.logTest(`Response time for ${page}`, false, `Error: ${error.message}`);
      }
    }
  }

  static async testCompression() {
    console.log(`\n${colors.cyan}=== Compression Tests ===${colors.reset}`);
    
    try {
      const response = await SecurityTester.makeRequest(BASE_URL, {
        headers: {
          'Accept-Encoding': 'gzip, deflate, br',
        },
      });
      
      const contentEncoding = response.headers['content-encoding'];
      const isCompressed = contentEncoding && 
        (contentEncoding.includes('gzip') || 
         contentEncoding.includes('deflate') || 
         contentEncoding.includes('br'));
      
      SecurityTester.logTest(
        'Response compression enabled',
        isCompressed,
        isCompressed ? 
          `Compression: ${contentEncoding}` : 
          'No compression detected'
      );

    } catch (error) {
      SecurityTester.logTest('Compression test', false, `Error: ${error.message}`);
    }
  }
}

// Main test runner
async function runAllTests() {
  console.log(`${colors.magenta}========================================`);
  console.log(`🔒 Security Test Suite for Carleton Resume`);
  console.log(`🌐 Testing: ${BASE_URL}`);
  console.log(`⏰ Started: ${new Date().toISOString()}`);
  console.log(`========================================${colors.reset}`);

  try {
    // Security tests
    await SecurityTests.testSecurityHeaders();
    await SecurityTests.testRateLimiting();
    await SecurityTests.testInputValidation();
    await SecurityTests.testOriginValidation();
    await SecurityTests.testSuspiciousPathBlocking();
    await SecurityTests.testHTTPSRedirect();
    await SecurityTests.testDependencyVulnerabilities();
    await SecurityTests.testResponseHeaders();
    
    // Performance tests
    await PerformanceTests.testResponseTimes();
    await PerformanceTests.testCompression();
    
    // Summary
    console.log(`\n${colors.magenta}=== Test Summary ===${colors.reset}`);
    const passed = TEST_RESULTS.filter(r => r.passed).length;
    const failed = TEST_RESULTS.filter(r => !r.passed).length;
    const total = TEST_RESULTS.length;
    
    console.log(`${colors.green}✓ Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}✗ Failed: ${failed}${colors.reset}`);
    console.log(`📊 Total: ${total}`);
    console.log(`🎯 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);
    
    if (failed > 0) {
      console.log(`\n${colors.red}❌ Failed Tests:${colors.reset}`);
      TEST_RESULTS
        .filter(r => !r.passed)
        .forEach(test => {
          console.log(`   • ${test.name}: ${test.details}`);
        });
    }
    
    console.log(`\n${colors.blue}ℹ️  For detailed security analysis, consider running:`);
    console.log(`   • OWASP ZAP scan`);
    console.log(`   • nmap port scan`);
    console.log(`   • SSL Labs test (https://www.ssllabs.com/ssltest/)`);
    console.log(`   • Security Headers test (https://securityheaders.com/)`);
    console.log(`${colors.reset}`);
    
    // Exit with error code if tests failed
    process.exit(failed > 0 ? 1 : 0);

  } catch (error) {
    console.error(`${colors.red}Fatal error running tests: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// CLI help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Security Test Suite for Carleton Online Resume

Usage: node security-test.js [options] [base-url]

Arguments:
  base-url    Base URL to test (default: http://localhost:3000)

Options:
  --help, -h  Show this help message

Examples:
  node security-test.js
  node security-test.js http://localhost:3000
  node security-test.js https://carleton-resume.vercel.app

This script tests:
  • Security headers (HSTS, CSP, XSS protection, etc.)
  • Rate limiting functionality
  • Input validation and sanitization
  • Origin validation for CORS
  • Suspicious path blocking
  • HTTPS redirect configuration
  • Dependency vulnerabilities (npm audit)
  • Response header security
  • Performance and compression
  `);
  process.exit(0);
}

// Run the tests
runAllTests().catch(error => {
  console.error(`${colors.red}Unhandled error: ${error.message}${colors.reset}`);
  process.exit(1);
});