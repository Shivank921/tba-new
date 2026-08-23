#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================
user_problem_statement: |
  Add backend integration for the Bengali Association Coimbatore website:
  1. Contact form submissions -> POST /api/contact and stored in MongoDB
  2. Newsletter subscription -> POST /api/newsletter and stored in MongoDB
  Both should be persistent, validated (email format, required fields), and idempotent for newsletter (same email should not create duplicates).

backend:
  - task: "POST /api/contact - Contact form submission"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Created ContactCreate model with name/email/phone/message validation, persists to db.contacts collection with UUID id and ISO timestamp. Also added GET /api/contact for listing."
        -working: true
        -agent: "testing"
        -comment: "✅ ALL TESTS PASSED (6/6). Verified: (1) Valid submission with all fields returns 201 with id, name, email, phone, message, created_at in ISO format; (2) Valid submission without phone (optional) returns 201 with phone=null; (3) Missing name returns 422; (4) Invalid email format returns 422; (5) Empty message returns 422; (6) GET /api/contact returns list sorted by most recent first, no _id exposed. MongoDB storage confirmed."
  - task: "POST /api/newsletter - Newsletter subscription"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Created SubscribeCreate with EmailStr validation, lowercased email uniqueness check, idempotent (returns existing on duplicate). Also GET /api/newsletter for listing."
        -working: true
        -agent: "testing"
        -comment: "✅ ALL TESTS PASSED (5/5). Verified: (1) Valid subscription returns 201 with id, lowercased email, subscribed_at; (2) IDEMPOTENCY CONFIRMED - duplicate email returns same id and timestamp (no duplicate created); (3) Invalid email format returns 422; (4) Missing email returns 422; (5) GET /api/newsletter returns list with no _id exposed. MongoDB storage confirmed."

frontend:
  - task: "Contact form wired to /api/contact"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Contact.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Replaced localStorage stub with axios POST to REACT_APP_BACKEND_URL + /api/contact, loading spinner + success/error toast."
  - task: "Newsletter form wired to /api/newsletter"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Footer.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Footer subscribe form now calls /api/newsletter with axios, shows loading/done state + toast."

metadata:
  created_by: "main_agent"
  version: "1.2"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -comment: "Please test the two new endpoints: POST /api/contact (fields: name, email, phone optional, message; must validate email + reject empty required) and POST /api/newsletter (email; must be idempotent for duplicate emails). Also GET listing endpoints. Use REACT_APP_BACKEND_URL from /app/frontend/.env with /api prefix."
    -agent: "testing"
    -comment: "✅ BACKEND TESTING COMPLETE - ALL TESTS PASSED (11/11). Both endpoints working perfectly: POST /api/contact validates all fields correctly (name, email, message required; phone optional), returns proper 201/422 responses, stores in MongoDB contacts collection. POST /api/newsletter is fully idempotent (duplicate emails return same id/timestamp), validates email format, stores in subscribers collection. Both GET endpoints return sorted lists without exposing MongoDB _id. No issues found."
