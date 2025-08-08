from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the landing page
            page.goto("http://localhost:59084/index.html")

            # Wait for the main heading to be visible
            expect(page.get_by_role("heading", name="Orbital Pet")).to_be_visible(timeout=10000)

            # Take a screenshot
            page.screenshot(path="jules-scratch/verification/verification.png")

            print("Screenshot captured successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
