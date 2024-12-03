from behave import *
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import ElementClickInterceptedException
from selenium.webdriver.chrome.service import Service

@given('Launch Chrome Browser')
def launch_browser(context):
    service = Service(executable_path="/usr/bin/chromedriver")
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    context.driver = webdriver.Chrome(service=service,options=options)
    context.driver.maximize_window()

@when('Open Adaptive Investments Page')
def go_to_home_screen(context):
    context.driver.get('http://localhost:3000/')

@then('User should see the home page')
def step_then_i_should_see_the_home_page(context):
    WebDriverWait(context.driver, 10).until(EC.url_contains('http://localhost:3000/'))
    assert context.driver.current_url == 'http://localhost:3000/'

