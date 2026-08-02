import os
from datetime import datetime
import json
from playwright.sync_api import sync_playwright

def capture_screenshots():
    print(">>> [V3.0] Starting Capture Script (Naver Optimized) <<<")
    # 1. Date Calculation (Target: Yesterday)
    # User manages data based on previous day's closing
    from datetime import timedelta
    import shutil
    
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    
    target_date_str = yesterday.strftime('%Y-%m-%d')
    today_str = today.strftime('%Y-%m-%d') 
    
    # Clean up SingletonLock if it exists (Fix "Browser already running" error)
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        lock_file = os.path.join(current_dir, 'browser_session', 'SingletonLock')
        if os.path.exists(lock_file):
            print(f"Removing stale lock file: {lock_file}")
            os.remove(lock_file)
    except Exception as e:
        print(f"Warning: Could not remove lock file: {e}")

    # Save folder
    # Add timestamp to create a unique folder for every execution
    timestamp_folder = datetime.now().strftime('%H%M%S')
    folder_name = f"{today_str}_{timestamp_folder}-marketing_Data"
    
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
        print(f"Created new directory: {folder_name}")
    else:
        print(f"Directory exists: {folder_name}")

    # 2. Dynamic URLs
    target_date_str = yesterday.strftime('%Y-%m-%d')
    
    # Try to load target_urls.json (saved by Dashboard)
    # Use absolute path to ensure we find it
    current_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(current_dir, 'target_urls.json')
    
    try:
        print(f"Loading URLs from: {json_path}")
        with open(json_path, 'r', encoding='utf-8') as f:
            raw_urls = json.load(f)
        print(f"Loaded {len(raw_urls)} URLs.")
    except Exception as e:
        print(f"Error loading target_urls.json: {e}")
        raw_urls = []
        
    if not raw_urls:
         # Default Fallback if file missing or empty
         print("No dynamic URLs found. Using defaults (Naver Place/Ads).")
         raw_urls = [
            "https://new.smartplace.naver.com/bizes/place/9587595/statistics?bookingBusinessId=1378996&endDate={YESTERDAY}&menu=place&placeTab=inflow&startDate={YESTERDAY}&term=weekly",
            "https://manage.searchad.naver.com/customers/3425559/campaigns/cmp-a001-01-000000009209240"
         ]

    urls = []
    for i, u in enumerate(raw_urls):
        # REPLACE {YESTERDAY} placeholder
        final_url = u.replace("{YESTERDAY}", target_date_str)
        # Also replace {DATE} just in case
        final_url = final_url.replace("{DATE}", target_date_str)
        
        # Create a safe filename from URL domain or index
        try:
             import urllib.parse
             domain = urllib.parse.urlparse(final_url).netloc.replace("www.", "")
             name = f"{target_date_str}-site_{i+1}_{domain}"
        except:
             name = f"{target_date_str}-site_{i+1}"
             
        urls.append({"url": final_url, "name": name})

    # 3. Persistent Playwright Execution
    with sync_playwright() as p:
        # Browser data will be saved here (cookies, login state)
        user_data_dir = os.path.join(os.getcwd(), 'browser_session')
        
        print(f"Browser Data Dir: {user_data_dir}")
        print("Launching Browser... (Visible Mode)")

        # Launch persistent context
        context = p.chromium.launch_persistent_context(
            user_data_dir,
            headless=False, # Show the browser
            channel="chrome", # Use real Google Chrome
            viewport={"width": 1920, "height": 1080},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        
        try:
            # Open the first page to let user login
            page = context.pages[0] if context.pages else context.new_page()
            
            print("\n" + "="*50)
            print(" [알림] 브라우저가 열렸습니다!")
            print(" 1. 열린 탭들에서 로그인이 필요한 경우 로그인을 진행해주세요.")
            print(" 2. 로그인이 완료되면 이 터미널 창에서 [Enter] 키를 누르세요.")
            print("="*50 + "\n")
            
            # Open all target URLs in tabs so user can login
            for i, item in enumerate(urls):
                p = context.pages[i] if i < len(context.pages) else context.new_page()
                p.goto(item['url'], wait_until="domcontentloaded")
            
            # Wait for user confirmation in terminal
            input(">> 로그인을 완료하셨나요? 여기서 엔터를 누르면 촬영을 시작합니다: ")

            print("\nStarting capture...")
            
            for item in urls:
                try:
                    print(f"[{item['name']}] Navigating to: {item['url']}")
                    page.goto(item['url'], wait_until="domcontentloaded", timeout=60000)
                    
                    # Wait for stability
                    page.wait_for_timeout(3000)
                    
                    
                    
                    # ---------------------------------------------------------
                    # [V3.5] Giant Viewport Strategy for Naver SPAs
                    # Instead of scrolling, we make the browser TALL so everything renders instantly.
                    
                    # 1. Trigger render of bottom elements (just in case)
                    page.keyboard.press("End")
                    page.wait_for_timeout(2000)

                    # 2. Calculate required height
                    # We check for the largest scrollable container OR body height
                    total_height = page.evaluate("""() => {
                        const bodyHeight = document.body.scrollHeight;
                        // Check if there's a specific container larger than body
                        const els = Array.from(document.querySelectorAll('*')).filter(el => el.scrollHeight > el.clientHeight);
                        if (els.length > 0) {
                            els.sort((a, b) => b.scrollHeight - a.scrollHeight);
                            return Math.max(bodyHeight, els[0].scrollHeight);
                        }
                        return bodyHeight;
                    }""")
                    
                    # 3. Add padding to be safe (Naver often needs ~3000px)
                    final_height = int(total_height) + 1000
                    if final_height < 2500: final_height = 2500 # Minimum tall height
                    
                    print(f"   [Auto-Resize] Setting Viewport to: 1920 x {final_height}")
                    page.set_viewport_size({"width": 1920, "height": final_height})
                    
                    # 4. Wait for repaint (Critical)
                    page.wait_for_timeout(2000)
                    
                    # 5. Capture (Standard screenshot, NOT full_page, because viewport is already full)
                    # Add timestamp to ensure uniqueness and visibility of update
                    timestamp = datetime.now().strftime("%H%M%S")
                    filename = f"{folder_name}/{item['name']}_{timestamp}.png"
                    
                    page.screenshot(path=filename) # Default behavior captures visible viewport logic
                    
                    abs_path = os.path.abspath(filename)
                    print(f"[{item['name']}] ✅ Saved NEW screenshot: {abs_path}")
                    
                except Exception as e:
                    print(f"[{item['name']}] Error: {e}")

        except Exception as e:
            print(f"Global Error: {e}")
        finally:
            context.close()
            print("Browser closed.")
            
    # 4. Run OCR Processing
    # 4. AI Data Extraction
    # try:
    #     import gemini_processor
    #     gemini_processor.process_latest_screenshots()
    # except Exception as e:
    #     print(f"AI Processor Error: {e}")

if __name__ == "__main__":
    capture_screenshots()
