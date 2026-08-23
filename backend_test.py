#!/usr/bin/env python3
"""
Backend API Testing for Bengali Association Coimbatore
Tests the contact form and newsletter subscription endpoints
"""

import requests
import json
from datetime import datetime

# Base URL from frontend/.env
BASE_URL = "https://assoc-cultural.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_contact_valid_with_all_fields():
    """Test POST /api/contact with all fields including optional phone"""
    print_test_header("Contact Form - Valid submission with all fields")
    
    payload = {
        "name": "Rajesh Kumar",
        "email": "rajesh.kumar@example.com",
        "phone": "+919876543210",
        "message": "Hello, I am interested in becoming a member of the Bengali Association."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            # Verify all required fields are present
            checks = [
                ('id' in data, "Response has 'id' field"),
                ('name' in data and data['name'] == payload['name'], "Name matches"),
                ('email' in data and data['email'] == payload['email'], "Email matches"),
                ('phone' in data and data['phone'] == payload['phone'], "Phone matches"),
                ('message' in data and data['message'] == payload['message'], "Message matches"),
                ('created_at' in data, "Has 'created_at' timestamp"),
                ('_id' not in data, "MongoDB _id not exposed")
            ]
            
            all_passed = True
            for check, desc in checks:
                print_result(check, desc)
                if not check:
                    all_passed = False
            
            # Verify created_at is valid ISO datetime
            try:
                datetime.fromisoformat(data['created_at'].replace('Z', '+00:00'))
                print_result(True, "created_at is valid ISO datetime")
            except:
                print_result(False, "created_at is NOT valid ISO datetime")
                all_passed = False
            
            return all_passed
        else:
            print_result(False, f"Expected 201, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_without_phone():
    """Test POST /api/contact without optional phone field"""
    print_test_header("Contact Form - Valid submission without phone (optional)")
    
    payload = {
        "name": "Ananya Chatterjee",
        "email": "ananya.c@example.com",
        "message": "I would like to know more about upcoming cultural events."
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            checks = [
                ('id' in data, "Response has 'id' field"),
                ('name' in data, "Has name field"),
                ('email' in data, "Has email field"),
                ('message' in data, "Has message field"),
                ('created_at' in data, "Has created_at field"),
                (data.get('phone') is None, "Phone is None (not required)")
            ]
            
            all_passed = True
            for check, desc in checks:
                print_result(check, desc)
                if not check:
                    all_passed = False
            
            return all_passed
        else:
            print_result(False, f"Expected 201, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_missing_name():
    """Test POST /api/contact with missing name field"""
    print_test_header("Contact Form - Missing required 'name' field")
    
    payload = {
        "email": "test@example.com",
        "message": "This should fail due to missing name"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        passed = response.status_code == 422
        print_result(passed, f"Expected 422 for missing name, got {response.status_code}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_invalid_email():
    """Test POST /api/contact with invalid email format"""
    print_test_header("Contact Form - Invalid email format")
    
    payload = {
        "name": "Test User",
        "email": "not-a-valid-email",
        "message": "This should fail due to invalid email"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        passed = response.status_code == 422
        print_result(passed, f"Expected 422 for invalid email, got {response.status_code}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_empty_message():
    """Test POST /api/contact with empty message"""
    print_test_header("Contact Form - Empty message field")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "message": ""
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        passed = response.status_code == 422
        print_result(passed, f"Expected 422 for empty message, got {response.status_code}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_contact_get_list():
    """Test GET /api/contact to verify submissions"""
    print_test_header("Contact Form - GET list of submissions")
    
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of contacts: {len(data)}")
            
            if len(data) > 0:
                print(f"Sample (most recent): {json.dumps(data[0], indent=2)}")
                
                # Verify structure
                first = data[0]
                checks = [
                    ('id' in first, "Has 'id' field"),
                    ('name' in first, "Has 'name' field"),
                    ('email' in first, "Has 'email' field"),
                    ('message' in first, "Has 'message' field"),
                    ('created_at' in first, "Has 'created_at' field"),
                    ('_id' not in first, "MongoDB _id not exposed")
                ]
                
                all_passed = True
                for check, desc in checks:
                    print_result(check, desc)
                    if not check:
                        all_passed = False
                
                # Check if sorted by most recent first
                if len(data) >= 2:
                    first_time = datetime.fromisoformat(data[0]['created_at'].replace('Z', '+00:00'))
                    second_time = datetime.fromisoformat(data[1]['created_at'].replace('Z', '+00:00'))
                    sorted_check = first_time >= second_time
                    print_result(sorted_check, "Results sorted by most recent first")
                    if not sorted_check:
                        all_passed = False
                
                return all_passed
            else:
                print_result(True, "GET endpoint works (empty list)")
                return True
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_newsletter_valid():
    """Test POST /api/newsletter with valid email"""
    print_test_header("Newsletter - Valid subscription")
    
    # Use a unique email for this test
    test_email = f"subscriber.{datetime.now().timestamp()}@example.com"
    payload = {"email": test_email}
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 201:
            data = response.json()
            checks = [
                ('id' in data, "Response has 'id' field"),
                ('email' in data, "Has 'email' field"),
                ('subscribed_at' in data, "Has 'subscribed_at' timestamp"),
                ('_id' not in data, "MongoDB _id not exposed"),
                (data['email'] == test_email.lower(), "Email is lowercased")
            ]
            
            all_passed = True
            for check, desc in checks:
                print_result(check, desc)
                if not check:
                    all_passed = False
            
            # Store the ID for idempotency test
            global first_subscription_id
            first_subscription_id = data['id']
            
            return all_passed
        else:
            print_result(False, f"Expected 201, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_newsletter_idempotent():
    """Test POST /api/newsletter idempotency - same email twice"""
    print_test_header("Newsletter - Idempotency check (duplicate email)")
    
    # Use a specific email for idempotency test
    test_email = "idempotency.test@example.com"
    payload = {"email": test_email}
    
    try:
        # First submission
        print("First submission:")
        response1 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response1.status_code}")
        print(f"Response: {json.dumps(response1.json(), indent=2)}")
        
        if response1.status_code != 201:
            print_result(False, f"First submission failed with {response1.status_code}")
            return False
        
        data1 = response1.json()
        id1 = data1['id']
        
        # Second submission (duplicate)
        print("\nSecond submission (duplicate):")
        response2 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response2.status_code}")
        print(f"Response: {json.dumps(response2.json(), indent=2)}")
        
        if response2.status_code != 201:
            print_result(False, f"Second submission failed with {response2.status_code}")
            return False
        
        data2 = response2.json()
        id2 = data2['id']
        
        # Verify idempotency
        checks = [
            (id1 == id2, f"Same ID returned (id1={id1}, id2={id2})"),
            (data1['email'] == data2['email'], "Same email returned"),
            (data1['subscribed_at'] == data2['subscribed_at'], "Same subscribed_at timestamp")
        ]
        
        all_passed = True
        for check, desc in checks:
            print_result(check, desc)
            if not check:
                all_passed = False
        
        return all_passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_newsletter_invalid_email():
    """Test POST /api/newsletter with invalid email"""
    print_test_header("Newsletter - Invalid email format")
    
    payload = {"email": "not-valid-email"}
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        passed = response.status_code == 422
        print_result(passed, f"Expected 422 for invalid email, got {response.status_code}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_newsletter_missing_email():
    """Test POST /api/newsletter with missing email"""
    print_test_header("Newsletter - Missing email field")
    
    payload = {}
    
    try:
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        passed = response.status_code == 422
        print_result(passed, f"Expected 422 for missing email, got {response.status_code}")
        return passed
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def test_newsletter_get_list():
    """Test GET /api/newsletter to verify subscriptions"""
    print_test_header("Newsletter - GET list of subscribers")
    
    try:
        response = requests.get(f"{BASE_URL}/newsletter", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of subscribers: {len(data)}")
            
            if len(data) > 0:
                print(f"Sample (most recent): {json.dumps(data[0], indent=2)}")
                
                # Verify structure
                first = data[0]
                checks = [
                    ('id' in first, "Has 'id' field"),
                    ('email' in first, "Has 'email' field"),
                    ('subscribed_at' in first, "Has 'subscribed_at' field"),
                    ('_id' not in first, "MongoDB _id not exposed")
                ]
                
                all_passed = True
                for check, desc in checks:
                    print_result(check, desc)
                    if not check:
                        all_passed = False
                
                return all_passed
            else:
                print_result(True, "GET endpoint works (empty list)")
                return True
        else:
            print_result(False, f"Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "="*80)
    print("BACKEND API TESTING - Bengali Association Coimbatore")
    print(f"Base URL: {BASE_URL}")
    print("="*80)
    
    results = {}
    
    # Contact Form Tests
    print("\n\n" + "#"*80)
    print("# CONTACT FORM ENDPOINT TESTS")
    print("#"*80)
    
    results['contact_valid_all_fields'] = test_contact_valid_with_all_fields()
    results['contact_without_phone'] = test_contact_without_phone()
    results['contact_missing_name'] = test_contact_missing_name()
    results['contact_invalid_email'] = test_contact_invalid_email()
    results['contact_empty_message'] = test_contact_empty_message()
    results['contact_get_list'] = test_contact_get_list()
    
    # Newsletter Tests
    print("\n\n" + "#"*80)
    print("# NEWSLETTER ENDPOINT TESTS")
    print("#"*80)
    
    results['newsletter_valid'] = test_newsletter_valid()
    results['newsletter_idempotent'] = test_newsletter_idempotent()
    results['newsletter_invalid_email'] = test_newsletter_invalid_email()
    results['newsletter_missing_email'] = test_newsletter_missing_email()
    results['newsletter_get_list'] = test_newsletter_get_list()
    
    # Summary
    print("\n\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\n{'='*80}")
    print(f"TOTAL: {passed}/{total} tests passed")
    print(f"{'='*80}\n")
    
    return passed == total

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
