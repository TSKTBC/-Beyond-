#!/usr/bin/env node

/**
 * Homepage Analysis Script using Playwright
 */

import { chromium } from 'playwright';

async function analyzeHomepage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('🔍 Analyzing homepage at http://localhost:3000...\n');

    // Navigate to homepage
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });

    // Take screenshot
    await page.screenshot({ path: 'homepage-analysis.png', fullPage: true });
    console.log('✅ Screenshot saved: homepage-analysis.png\n');

    // Check page title
    const title = await page.title();
    console.log(`📄 Page Title: ${title}\n`);

    // Check hero section
    const heroHeading = await page.textContent('h1').catch(() => null);
    console.log(`🎯 Hero Heading: ${heroHeading}\n`);

    // Check if images are loading
    const images = await page.$$eval('img', imgs => imgs.map(img => ({
      src: img.src,
      alt: img.alt,
      loaded: img.complete && img.naturalHeight !== 0
    })));
    console.log(`🖼️  Images found: ${images.length}`);
    const brokenImages = images.filter(img => !img.loaded);
    if (brokenImages.length > 0) {
      console.log(`⚠️  Broken images: ${brokenImages.length}`);
      brokenImages.forEach(img => console.log(`   - ${img.src}`));
    } else {
      console.log(`✅ All images loaded successfully`);
    }
    console.log('');

    // Check buttons
    const buttons = await page.$$eval('button, a[role="button"], a.btn', btns =>
      btns.map(btn => btn.textContent?.trim())
    );
    console.log(`🔘 Buttons/CTAs found: ${buttons.length}`);
    buttons.slice(0, 10).forEach(btn => console.log(`   - ${btn}`));
    console.log('');

    // Check for animations
    const animatedElements = await page.$$eval('[class*="animate"], [class*="fade"], [class*="slide"]',
      els => els.length
    );
    console.log(`✨ Animated elements: ${animatedElements}\n`);

    // Check performance metrics
    const performanceMetrics = await page.evaluate(() => ({
      domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
      loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
    }));
    console.log(`⚡ Performance Metrics:`);
    console.log(`   - DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
    console.log(`   - Load Complete: ${performanceMetrics.loadComplete}ms`);
    console.log('');

    // Check accessibility issues
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', h => h.length);
    const ariaLabels = await page.$$eval('[aria-label]', el => el.length);
    console.log(`♿ Accessibility:`);
    console.log(`   - Headings: ${headings}`);
    console.log(`   - ARIA labels: ${ariaLabels}`);
    console.log('');

    // Check for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Scroll test
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'homepage-scrolled.png', fullPage: true });
    console.log('✅ Scrolled screenshot saved: homepage-scrolled.png\n');

    // Check mobile responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'homepage-mobile.png', fullPage: true });
    console.log('✅ Mobile screenshot saved: homepage-mobile.png\n');

    console.log('📊 Analysis Summary:');
    console.log('='.repeat(50));
    console.log(`✅ Page loaded successfully`);
    console.log(`✅ Screenshots captured (desktop, scrolled, mobile)`);
    console.log(`📈 Total elements analyzed`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeHomepage();
