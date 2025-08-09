from playwright.sync_api import sync_playwright, expect
import os

def run():
    # Create directory if it doesn't exist
    output_dir = "jules-scratch/verification"
    os.makedirs(output_dir, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # 1. Test Landing Page
            print("Navigating to Landing Page...")
            page.goto("http://localhost:3000")
            expect(page.locator('h1:has-text("Orbital Pet")')).to_be_visible(timeout=10000)
            page.screenshot(path=f"{output_dir}/landing-page.png")
            print("Landing Page screenshot captured.")

            # 2. Test Login Page
            print("Navigating to Login Page...")
            page.goto("http://localhost:3000/login")
            expect(page.locator('button:has-text("카카오로 시작하기")')).to_be_visible(timeout=10000)
            page.screenshot(path=f"{output_dir}/login-page.png")
            print("Login Page screenshot captured.")

            # 3. Test Milestone Page
            print("Navigating to Milestone Page...")
            page.goto("http://localhost:3000/milestone")
            expect(page.locator('h1:has-text("인공위성 다마고치 프로젝트 마일스톤")')).to_be_visible(timeout=10000)
            page.screenshot(path=f"{output_dir}/milestone-page.png")
            print("Milestone Page screenshot captured.")

            print("\nAll screenshots captured successfully.")

        except Exception as e:
            print(f"\nAn error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
