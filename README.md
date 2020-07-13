# Hospital-REST-API
An API for Doctors of a Hospital to keep track of all the patients' COVID Status<br>
The status can be either `Negative`, `Travelled`, `Symptoms`, `Positive`

---

**Set up Project**  
1. Create a `.env` file and fill in all the fields mentioned in `.env-sample` file
2. Run `npm install`
3. Get Started using `npm start`  
 or Use Nodemon - `npm run dev`  
 
 ---
 
 ### API Hierarchy
 - ` /doctors`
   - ` /register`
   - ` /login` 
   <br/>
- ` /patients`
  - ` /register`
  - ` /id`
    - ` /create- `report`
    - ` /all- `reports`  
    <br/>
- ` /reports`
  - ` /status`

---

### API Reference
 
| End Point         | Method | Description                    |
|-------------------|--------|--------------------------------|
| /doctors/register | POST   | Register a New User ( Doctor ) |
| /doctors/login    | POST   | Login and receive JWT          |   

<br>

| End Point                  | Method | Description                                                                                     |
|----------------------------|:------:|-------------------------------------------------------------------------------------------------|
| /patients/register         |  POST  | Register a New User ( Patient)                                                                  |
| /patients/id/create_report |  POST  | Create a Report with a Valid Status for Patient, id can be either PatientID or Patient's Phone# |
| /patients/id/all_reports   |  POST  | Fetch all Reports for a Patient id can be either PatientID or Patient's Phone#                  |  

<br>

| End Point       | Method | Description                                                                                                              |
|-----------------|:------:|--------------------------------------------------------------------------------------------------------------------------|
| /reports/status |   GET  | Fetch all Reports with a Particular Status, Status can be any of the following -  Negative, Travelled, Symptoms, Positive |


