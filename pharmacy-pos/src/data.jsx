// PharmOS — mock data layer
const AppData = (() => {

const NAV = [
  { group: 'Dispensing', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'queue', label: 'Rx Queue', icon: 'Queue', badge: '23' },
    { id: 'new-rx', label: 'New Prescription', icon: 'NewRx' },
    { id: 'checkout', label: 'Pickup & Checkout', icon: 'Cart' },
    { id: 'returns', label: 'Returns', icon: 'Refresh' },
  ]},
  { group: 'People', items: [
    { id: 'patients', label: 'Patients', icon: 'Patients' },
    { id: 'staff', label: 'Staff', icon: 'People' },
  ]},
  { group: 'Stock', items: [
    { id: 'inventory', label: 'Inventory', icon: 'Box', badge: '7' },
    { id: 'purchases', label: 'Purchases', icon: 'Truck' },
    { id: 'wholesalers', label: 'Wholesalers', icon: 'Building' },
  ]},
  { group: 'Money', items: [
    { id: 'claims', label: 'PBM Claims', icon: 'Shield' },
    { id: 'dir', label: 'DIR Fee Tracker', icon: 'Coin' },
  ]},
  { group: 'Insights', items: [
    { id: 'reports', label: 'Reports', icon: 'File' },
    { id: 'analytics', label: 'Analytics', icon: 'Chart' },
  ]},
  { group: 'System', items: [
    { id: 'integrations', label: 'Integrations', icon: 'Plug' },
    { id: 'settings', label: 'Settings', icon: 'Cog' },
  ]},
];

// Rx Queue items, by stage
const RX_QUEUE = {
  intake: [
    { id:'RX-78421', pt:'Margaret Chen', age:67, drug:'Lisinopril 10 mg', qty:'#30', prescriber:'Dr. R. Okafor', recv:'09:42', priority:'routine', tag:'eRx' },
    { id:'RX-78422', pt:'Daniel Rivera', age:54, drug:'Atorvastatin 20 mg', qty:'#90', prescriber:'Dr. S. Patel', recv:'09:51', priority:'routine', tag:'eRx' },
    { id:'RX-78423', pt:'Olivia Park', age:34, drug:'Amoxicillin 500 mg', qty:'#21', prescriber:'Dr. M. Liu', recv:'10:03', priority:'urgent', tag:'phone' },
    { id:'RX-78424', pt:'Wei Tanaka', age:71, drug:'Metformin XR 1000 mg', qty:'#60', prescriber:'Dr. R. Okafor', recv:'10:14', priority:'routine', tag:'eRx' },
  ],
  verify: [
    { id:'RX-78415', pt:'James O’Brien', age:62, drug:'Warfarin 5 mg', qty:'#30', prescriber:'Dr. K. Adeyemi', recv:'09:18', priority:'urgent', tag:'C-II', interactions:1 },
    { id:'RX-78417', pt:'Aisha Bello', age:48, drug:'Levothyroxine 50 mcg', qty:'#90', prescriber:'Dr. M. Liu', recv:'09:26', priority:'routine', tag:'eRx' },
    { id:'RX-78419', pt:'Carlos Mendez', age:39, drug:'Sertraline 50 mg', qty:'#30', prescriber:'Dr. T. Halvorsen', recv:'09:32', priority:'routine', tag:'eRx' },
  ],
  fill: [
    { id:'RX-78410', pt:'Priya Sharma', age:29, drug:'Albuterol HFA inhaler', qty:'#1', prescriber:'Dr. S. Patel', recv:'08:55', priority:'urgent', tag:'eRx', station:'Robot A' },
    { id:'RX-78411', pt:'Henrik Vogel', age:73, drug:'Eliquis 5 mg', qty:'#60', prescriber:'Dr. R. Okafor', recv:'09:02', priority:'routine', tag:'eRx', station:'Counter 2' },
    { id:'RX-78413', pt:'Zara Khan', age:42, drug:'Metoprolol 25 mg', qty:'#30', prescriber:'Dr. T. Halvorsen', recv:'09:08', priority:'routine', tag:'refill', station:'Counter 1' },
    { id:'RX-78414', pt:'Bashir Idris', age:58, drug:'Pantoprazole 40 mg', qty:'#90', prescriber:'Dr. K. Adeyemi', recv:'09:11', priority:'routine', tag:'eRx', station:'Robot A' },
    { id:'RX-78416', pt:'Lena Kowalski', age:51, drug:'Gabapentin 300 mg', qty:'#90', prescriber:'Dr. M. Liu', recv:'09:20', priority:'routine', tag:'eRx', station:'Counter 2' },
  ],
  check: [
    { id:'RX-78403', pt:'Theodore Ng', age:81, drug:'Donepezil 10 mg', qty:'#30', prescriber:'Dr. S. Patel', recv:'08:32', priority:'routine', tag:'eRx', filled:'09:48' },
    { id:'RX-78405', pt:'Maya Johansson', age:36, drug:'Adderall XR 20 mg', qty:'#30', prescriber:'Dr. T. Halvorsen', recv:'08:39', priority:'routine', tag:'C-II', filled:'09:55' },
    { id:'RX-78407', pt:'Reza Mahmoud', age:60, drug:'Tamsulosin 0.4 mg', qty:'#90', prescriber:'Dr. R. Okafor', recv:'08:47', priority:'routine', tag:'eRx', filled:'10:02' },
  ],
  ready: [
    { id:'RX-78391', pt:'Solomon Adebayo', age:44, drug:'Rosuvastatin 10 mg', qty:'#30', prescriber:'Dr. M. Liu', recv:'08:01', priority:'routine', tag:'eRx', ready:'09:32', bin:'A-14' },
    { id:'RX-78392', pt:'Ingrid Holm', age:67, drug:'Bisoprolol 5 mg', qty:'#90', prescriber:'Dr. K. Adeyemi', recv:'08:04', priority:'routine', tag:'eRx', ready:'09:34', bin:'A-15' },
    { id:'RX-78394', pt:'Yusuke Nakamura', age:55, drug:'Latanoprost 0.005% drops', qty:'#1', prescriber:'Dr. S. Patel', recv:'08:11', priority:'routine', tag:'eRx', ready:'09:41', bin:'B-02' },
    { id:'RX-78396', pt:'Naomi Forsberg', age:38, drug:'Prenatal vitamins', qty:'#90', prescriber:'Dr. M. Liu', recv:'08:18', priority:'routine', tag:'eRx', ready:'09:47', bin:'B-03' },
    { id:'RX-78399', pt:'Femi Adeyemi', age:62, drug:'Furosemide 40 mg', qty:'#60', prescriber:'Dr. R. Okafor', recv:'08:25', priority:'urgent', tag:'eRx', ready:'09:52', bin:'A-16' },
  ],
};

// Inventory
const INVENTORY = [
  { ndc:'00071-0156-23', drug:'Lipitor', generic:'Atorvastatin', strength:'20 mg', form:'Tablet', sched:'Rx', mfr:'Pfizer', stock:312, par:200, cost:0.42, awp:1.12, expiry:'2027-03', loc:'A-04', velocity:'high' },
  { ndc:'00378-0181-10', drug:'Metformin HCl', generic:'Metformin', strength:'1000 mg ER', form:'Tablet', sched:'Rx', mfr:'Mylan', stock:540, par:300, cost:0.08, awp:0.28, expiry:'2026-11', loc:'A-05', velocity:'high' },
  { ndc:'00006-0277-31', drug:'Norvasc', generic:'Amlodipine', strength:'5 mg', form:'Tablet', sched:'Rx', mfr:'Pfizer', stock:184, par:150, cost:0.06, awp:0.24, expiry:'2027-02', loc:'A-08', velocity:'high' },
  { ndc:'00069-1530-30', drug:'Lipitor', generic:'Atorvastatin', strength:'40 mg', form:'Tablet', sched:'Rx', mfr:'Pfizer', stock:42, par:120, cost:0.71, awp:1.84, expiry:'2026-09', loc:'A-04', velocity:'med' },
  { ndc:'00074-3368-13', drug:'Synthroid', generic:'Levothyroxine', strength:'50 mcg', form:'Tablet', sched:'Rx', mfr:'AbbVie', stock:260, par:180, cost:0.10, awp:0.42, expiry:'2026-12', loc:'B-02', velocity:'high' },
  { ndc:'50458-0578-30', drug:'Janumet', generic:'Sitagliptin/Metf.', strength:'50/1000', form:'Tablet', sched:'Rx', mfr:'Merck', stock:88, par:60, cost:6.40, awp:11.20, expiry:'2027-04', loc:'B-05', velocity:'med' },
  { ndc:'00173-0682-20', drug:'Advair Diskus', generic:'Fluticasone/Salm.', strength:'250/50', form:'Inhaler', sched:'Rx', mfr:'GSK', stock:14, par:25, cost:182.00, awp:336.00, expiry:'2026-08', loc:'C-01', velocity:'med' },
  { ndc:'00378-1810-10', drug:'Eliquis', generic:'Apixaban', strength:'5 mg', form:'Tablet', sched:'Rx', mfr:'BMS', stock:92, par:90, cost:5.20, awp:8.60, expiry:'2027-01', loc:'A-12', velocity:'high' },
  { ndc:'00781-5180-31', drug:'Sertraline HCl', generic:'Sertraline', strength:'50 mg', form:'Tablet', sched:'Rx', mfr:'Sandoz', stock:380, par:200, cost:0.09, awp:0.32, expiry:'2027-05', loc:'B-08', velocity:'high' },
  { ndc:'00378-6105-77', drug:'Pantoprazole', generic:'Pantoprazole', strength:'40 mg', form:'Tablet', sched:'Rx', mfr:'Mylan', stock:6, par:60, cost:0.18, awp:0.48, expiry:'2026-07', loc:'B-09', velocity:'med' },
  { ndc:'00185-0010-01', drug:'Adderall XR', generic:'Amphet/Dextroamp.', strength:'20 mg', form:'Capsule', sched:'C-II', mfr:'Teva', stock:48, par:60, cost:3.10, awp:5.80, expiry:'2026-10', loc:'VAULT-1', velocity:'high', flag:'controlled' },
  { ndc:'00603-3742-21', drug:'Hydrocodone/APAP', generic:'Hydrocodone/APAP', strength:'5/325', form:'Tablet', sched:'C-II', mfr:'Qualitest', stock:120, par:90, cost:0.22, awp:0.58, expiry:'2026-11', loc:'VAULT-1', velocity:'high', flag:'controlled' },
  { ndc:'00378-5410-93', drug:'Gabapentin', generic:'Gabapentin', strength:'300 mg', form:'Capsule', sched:'Rx', mfr:'Mylan', stock:412, par:240, cost:0.07, awp:0.22, expiry:'2027-03', loc:'B-11', velocity:'high' },
  { ndc:'00074-9296-13', drug:'Humira Pen', generic:'Adalimumab', strength:'40 mg/0.4 ml', form:'Pen inj.', sched:'Rx', mfr:'AbbVie', stock:8, par:6, cost:2840.00, awp:3210.00, expiry:'2026-06', loc:'FRIDGE-2', velocity:'low', flag:'fridge' },
  { ndc:'00071-1015-23', drug:'Lyrica', generic:'Pregabalin', strength:'75 mg', form:'Capsule', sched:'C-V', mfr:'Pfizer', stock:65, par:80, cost:1.60, awp:3.40, expiry:'2026-09', loc:'A-18', velocity:'med' },
  { ndc:'00006-0117-31', drug:'Lipitor', generic:'Atorvastatin', strength:'80 mg', form:'Tablet', sched:'Rx', mfr:'Pfizer', stock:0, par:60, cost:0.92, awp:2.20, expiry:'—', loc:'A-04', velocity:'low', flag:'oos' },
];

// Patients
const PATIENTS = [
  { mrn:'P-100482', name:'Margaret Chen', dob:'1958-03-14', age:67, sex:'F', phone:'(415) 555-0142', plan:'Medicare Part D · Humana', allergies:['Penicillin','Sulfa'], rxCount:7, lastVisit:'2 days ago', adherence:94, status:'active' },
  { mrn:'P-100395', name:'James O’Brien', dob:'1962-11-22', age:62, sex:'M', phone:'(415) 555-0188', plan:'BCBS PPO', allergies:['NSAIDs'], rxCount:5, lastVisit:'Today', adherence:88, status:'active' },
  { mrn:'P-100571', name:'Priya Sharma', dob:'1995-07-09', age:29, sex:'F', phone:'(415) 555-0233', plan:'Aetna HMO', allergies:[], rxCount:2, lastVisit:'Today', adherence:76, status:'active' },
  { mrn:'P-100612', name:'Theodore Ng', dob:'1943-01-30', age:81, sex:'M', phone:'(415) 555-0294', plan:'Medicare Part D · Wellcare', allergies:['Codeine'], rxCount:12, lastVisit:'5 days ago', adherence:91, status:'active' },
  { mrn:'P-100489', name:'Aisha Bello', dob:'1976-09-04', age:48, sex:'F', phone:'(415) 555-0307', plan:'United Healthcare', allergies:[], rxCount:4, lastVisit:'1 week ago', adherence:97, status:'active' },
  { mrn:'P-100503', name:'Daniel Rivera', dob:'1970-05-21', age:54, sex:'M', phone:'(415) 555-0341', plan:'Kaiser Permanente', allergies:['Statins (myalgia)'], rxCount:6, lastVisit:'Today', adherence:82, status:'active' },
  { mrn:'P-100620', name:'Henrik Vogel', dob:'1951-08-12', age:73, sex:'M', phone:'(415) 555-0388', plan:'Medicare Part D · Humana', allergies:[], rxCount:9, lastVisit:'3 days ago', adherence:93, status:'active' },
  { mrn:'P-100647', name:'Maya Johansson', dob:'1988-04-17', age:36, sex:'F', phone:'(415) 555-0412', plan:'Cigna PPO', allergies:[], rxCount:3, lastVisit:'Today', adherence:71, status:'attention' },
  { mrn:'P-100689', name:'Solomon Adebayo', dob:'1980-12-03', age:44, sex:'M', phone:'(415) 555-0455', plan:'BCBS HMO', allergies:[], rxCount:2, lastVisit:'2 weeks ago', adherence:64, status:'attention' },
];

// Wholesalers / Purchases
const WHOLESALERS = [
  { id:'WH-MCK', name:'McKesson', contact:'orders@mckesson.com', terms:'Net 30', mtd:38420, ytd:412800, rating:4.8 },
  { id:'WH-AMB', name:'AmerisourceBergen', contact:'priority@amerisource.com', terms:'Net 30', mtd:24180, ytd:288100, rating:4.6 },
  { id:'WH-CDH', name:'Cardinal Health', contact:'support@cardinal.com', terms:'Net 30', mtd:18920, ytd:201400, rating:4.5 },
  { id:'WH-HDS', name:'H.D. Smith', contact:'orders@hdsmith.com', terms:'Net 45', mtd:7820, ytd:84600, rating:4.3 },
];

const PURCHASES = [
  { po:'PO-30418', wholesaler:'McKesson', items:42, total:8240.18, status:'received', placed:'May 19', received:'May 21' },
  { po:'PO-30417', wholesaler:'AmerisourceBergen', items:28, total:5180.40, status:'transit', placed:'May 20', received:'—' },
  { po:'PO-30416', wholesaler:'Cardinal Health', items:18, total:3420.90, status:'received', placed:'May 18', received:'May 20' },
  { po:'PO-30415', wholesaler:'McKesson', items:56, total:12480.20, status:'received', placed:'May 16', received:'May 18' },
  { po:'PO-30414', wholesaler:'H.D. Smith', items:9, total:1840.10, status:'pending', placed:'May 21', received:'—' },
];

// PBM Claims
const CLAIMS = [
  { id:'CLM-88412', rx:'RX-78391', pt:'Solomon Adebayo', drug:'Rosuvastatin 10 mg', pbm:'BCBS HMO', billed:42.80, paid:38.20, copay:4.60, dir:-2.80, status:'paid', date:'May 21' },
  { id:'CLM-88411', rx:'RX-78392', pt:'Ingrid Holm', drug:'Bisoprolol 5 mg', pbm:'Humana Part D', billed:36.20, paid:32.10, copay:4.10, dir:-1.80, status:'paid', date:'May 21' },
  { id:'CLM-88410', rx:'RX-78394', pt:'Yusuke Nakamura', drug:'Latanoprost 0.005%', pbm:'OptumRx', billed:28.40, paid:0, copay:0, dir:0, status:'rejected', reason:'PA required', date:'May 21' },
  { id:'CLM-88409', rx:'RX-78388', pt:'Reza Mahmoud', drug:'Tamsulosin 0.4 mg', pbm:'CVS Caremark', billed:24.10, paid:21.40, copay:2.70, dir:-1.10, status:'paid', date:'May 21' },
  { id:'CLM-88408', rx:'RX-78386', pt:'Maya Johansson', drug:'Adderall XR 20 mg', pbm:'Cigna PPO', billed:128.40, paid:118.20, copay:10.20, dir:-3.40, status:'paid', date:'May 21' },
  { id:'CLM-88407', rx:'RX-78384', pt:'Lena Kowalski', drug:'Gabapentin 300 mg', pbm:'UHC', billed:18.20, paid:0, copay:0, dir:0, status:'pending', date:'May 21' },
  { id:'CLM-88406', rx:'RX-78382', pt:'Wei Tanaka', drug:'Metformin XR 1000', pbm:'Humana Part D', billed:14.40, paid:11.80, copay:2.60, dir:-1.40, status:'paid', date:'May 20' },
  { id:'CLM-88405', rx:'RX-78380', pt:'Margaret Chen', drug:'Lisinopril 10 mg', pbm:'Humana Part D', billed:12.10, paid:9.80, copay:2.30, dir:-1.20, status:'paid', date:'May 20' },
];

// Staff
const STAFF = [
  { id:'EMP-001', name:'Dr. Elena Vasquez', role:'Pharmacist-in-Charge', shift:'Mon–Fri 8a–6p', npi:'1234567890', license:'CA-RPh-48201', active:true, rxToday:142, errors:0 },
  { id:'EMP-002', name:'Dr. Marcus Okonkwo', role:'Staff Pharmacist', shift:'Tue–Sat 9a–7p', npi:'1234567891', license:'CA-RPh-49801', active:true, rxToday:118, errors:0 },
  { id:'EMP-003', name:'Sophie Lin', role:'Pharmacy Technician', shift:'Mon–Fri 8a–4p', npi:'—', license:'CA-Tech-12044', active:true, rxToday:96, errors:1 },
  { id:'EMP-004', name:'Andre Petrov', role:'Pharmacy Technician', shift:'Tue–Sat 10a–6p', npi:'—', license:'CA-Tech-13182', active:true, rxToday:88, errors:0 },
  { id:'EMP-005', name:'Hana Aoki', role:'Pharmacy Intern', shift:'Mon, Wed, Fri 9a–2p', npi:'—', license:'CA-Intern-7128', active:true, rxToday:34, errors:0 },
  { id:'EMP-006', name:'Robin Castellano', role:'Cashier', shift:'Wed–Sun 10a–7p', npi:'—', license:'—', active:true, rxToday:0, errors:0 },
];

// Reports
const REPORTS = [
  { id:'rpt-dea222', name:'DEA 222 Controlled Substance Log', cat:'Compliance', regulator:'DEA', schedule:'On-demand', last:'May 21' },
  { id:'rpt-hipaa', name:'HIPAA Access Audit Trail', cat:'Compliance', regulator:'HHS', schedule:'Monthly', last:'May 01' },
  { id:'rpt-inv-var', name:'Inventory Variance Report', cat:'Operations', regulator:'—', schedule:'Weekly', last:'May 19' },
  { id:'rpt-pbm-rec', name:'PBM Reconciliation', cat:'Finance', regulator:'—', schedule:'Daily', last:'May 21' },
  { id:'rpt-margin', name:'Margin by NDC', cat:'Finance', regulator:'—', schedule:'Weekly', last:'May 19' },
  { id:'rpt-dir', name:'DIR Fee Tracker', cat:'Finance', regulator:'—', schedule:'Monthly', last:'May 01' },
  { id:'rpt-pse', name:'Pseudoephedrine Sales Log', cat:'Compliance', regulator:'State', schedule:'Weekly', last:'May 20' },
  { id:'rpt-immun', name:'Immunization Registry Export', cat:'Compliance', regulator:'State', schedule:'Weekly', last:'May 19' },
  { id:'rpt-mtm', name:'MTM Service Billing', cat:'Finance', regulator:'—', schedule:'Monthly', last:'May 01' },
  { id:'rpt-cust', name:'Custom Report Builder', cat:'Operations', regulator:'—', schedule:'—', last:'—' },
];

// DIR fees by month
const DIR_HISTORY = [
  { m:'Dec', proj:-3840, actual:-3920 },
  { m:'Jan', proj:-4120, actual:-4280 },
  { m:'Feb', proj:-3680, actual:-3780 },
  { m:'Mar', proj:-4480, actual:-4520 },
  { m:'Apr', proj:-4220, actual:-4380 },
  { m:'May', proj:-3940, actual:null },
];

// 14-day Rx volume
const RX_VOLUME = [
  { d:'May 08', total:284, c2:18 }, { d:'May 09', total:301, c2:21 },
  { d:'May 10', total:268, c2:16 }, { d:'May 11', total:174, c2:9 },
  { d:'May 12', total:142, c2:7 }, { d:'May 13', total:298, c2:19 },
  { d:'May 14', total:312, c2:22 }, { d:'May 15', total:329, c2:24 },
  { d:'May 16', total:341, c2:25 }, { d:'May 17', total:312, c2:18 },
  { d:'May 18', total:188, c2:10 }, { d:'May 19', total:152, c2:8 },
  { d:'May 20', total:318, c2:21 }, { d:'May 21', total:336, c2:23 },
];

const INTEGRATIONS = [
  { cat:'PBMs', items:[
    { name:'Express Scripts', status:'on', meta:'NCPDP D.0 · v2024.06' },
    { name:'CVS Caremark', status:'on', meta:'NCPDP D.0 · v2024.06' },
    { name:'OptumRx', status:'on', meta:'NCPDP D.0 · v2024.06' },
    { name:'Humana Pharmacy', status:'on', meta:'NCPDP D.0 · v2024.06' },
    { name:'WellCare / Centene', status:'on', meta:'NCPDP D.0 · v2024.04' },
    { name:'Medicare Part D Hub', status:'on', meta:'Adjudication · v3.1' },
  ]},
  { cat:'Wholesalers', items:[
    { name:'McKesson Connect', status:'on', meta:'EDI 850/855/856' },
    { name:'AmerisourceBergen', status:'on', meta:'EDI 850/855/856' },
    { name:'Cardinal Health', status:'on', meta:'EDI 850/855/856' },
    { name:'H.D. Smith', status:'on', meta:'EDI 850/855' },
  ]},
  { cat:'EHR / EMR', items:[
    { name:'Epic (Care Everywhere)', status:'on', meta:'HL7 v2.5 · FHIR R4' },
    { name:'Cerner / Oracle Health', status:'on', meta:'FHIR R4' },
    { name:'Allscripts', status:'off', meta:'HL7 v2.5' },
  ]},
  { cat:'Dispensing robotics', items:[
    { name:'Parata Max', status:'on', meta:'Bidirectional · canister 384' },
    { name:'ScriptPro SP 200', status:'off', meta:'Bidirectional' },
    { name:'ARxIUM PharmASSIST', status:'off', meta:'Bidirectional' },
  ]},
  { cat:'Accounting', items:[
    { name:'QuickBooks Online', status:'on', meta:'Daily reconciliation' },
    { name:'Xero', status:'off', meta:'Daily reconciliation' },
  ]},
  { cat:'Drug databases', items:[
    { name:'First Databank (FDB)', status:'on', meta:'Interactions · v2025.05' },
    { name:'Medi-Span', status:'on', meta:'Interactions · v2025.05' },
    { name:'FDA Orange Book', status:'on', meta:'NDC · daily refresh' },
  ]},
];

// Settings pages
const SETTINGS_PAGES = [
  { id:'pharmacy', title:'Pharmacy profile', icon:'Building' },
  { id:'compliance', title:'Compliance & licenses', icon:'Shield' },
  { id:'pricing', title:'Pricing & DIR rules', icon:'Coin' },
  { id:'hardware', title:'Hardware', icon:'Print' },
  { id:'roles', title:'Roles & permissions', icon:'Lock' },
  { id:'notifications', title:'Notifications', icon:'Bell' },
  { id:'plan', title:'Plan & billing', icon:'Star' },
  { id:'integrations', title:'Integrations', icon:'Plug' },
  { id:'preferences', title:'Preferences', icon:'Cog' },
];

return {
  NAV, RX_QUEUE, INVENTORY, PATIENTS, WHOLESALERS, PURCHASES,
  CLAIMS, STAFF, REPORTS, DIR_HISTORY, RX_VOLUME, INTEGRATIONS, SETTINGS_PAGES,
};

})();

window.AppData = AppData;
