from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            page.goto("http://localhost:3000")

            # Wait for the command line prompt to appear after the boot sequence
            expect(page.locator('input[type="text"]')).to_be_visible(timeout=15000)

            # Take a screenshot
            page.screenshot(path="jules-scratch/verification/terminal-ui.png")

            print("Screenshot captured successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
