// Mock data for Couture POS — realistic Indian retail
const fmtINR = (n) => {
  if (n == null) return '—';
  const v = Math.round(Math.abs(n));
  let s;
  if (v >= 10000000) s = (n/10000000).toFixed(2) + ' Cr';
  else if (v >= 100000) s = (n/100000).toFixed(2) + ' L';
  else s = n.toLocaleString('en-IN');
  return '₹' + s;
};
const fmtINRRaw = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

const NAV = [
  { group: 'Sales', items: [
    { id:'dashboard', label:'Dashboard', icon:'Dashboard' },
    { id:'billing', label:'Billing', icon:'Cart' },
    { id:'sales', label:'Sales / Orders', icon:'Receipt', badge:'342' },
    { id:'register', label:'Register', icon:'Drawer' },
    { id:'returns', label:'Returns & Refunds', icon:'Return', badge:'4' },
  ]},
  { group: 'Stock & Catalog', items: [
    { id:'inventory', label:'Inventory', icon:'Box' },
    { id:'inventory-detail', label:'Inventory Item', icon:'Tag', hidden:true },
    { id:'purchases', label:'Purchases', icon:'Truck' },
    { id:'po-detail', label:'Purchase Order', icon:'Tag', hidden:true },
    { id:'suppliers', label:'Suppliers', icon:'Building' },
  ]},
  { group: 'Customers & Team', items: [
    { id:'customers', label:'Customers', icon:'Users' },
    { id:'staff', label:'Staff', icon:'Badge' },
  ]},
  { group: 'Money', items: [
    { id:'payments', label:'Payments', icon:'Money' },
    { id:'expenses', label:'Expenses', icon:'Wallet' },
  ]},
  { group: 'Insights', items: [
    { id:'reports', label:'Reports', icon:'Chart' },
    { id:'analytics', label:'Analytics', icon:'Brain' },
  ]},
  { group: 'Admin', items: [
    { id:'settings', label:'Settings', icon:'Gear' },
  ]},
];

// Settings sub-screens
const SETTINGS_PAGES = [
  { id:'business', title:'Business Profile', desc:'Store identity, GSTIN, invoice header', status:'Complete', icon:'Building' },
  { id:'tax', title:'Tax & GST', desc:'Slabs, HSN/SAC, round-off, tax mode', status:'Action needed', warn:'12 products missing HSN', icon:'Coin' },
  { id:'payments', title:'Payment Methods', desc:'Cash, card, UPI, wallets, gift cards', status:'Active', icon:'Money' },
  { id:'hardware', title:'Hardware', desc:'Printer, scanner, cash drawer, scale', status:'Active', icon:'Printer2' },
  { id:'team', title:'Team & Roles', desc:'Roles, permissions, approval limits', status:'Active', icon:'Users' },
  { id:'notifications', title:'Notifications', desc:'Email, SMS, WhatsApp, in-app alerts', status:'Active', icon:'Bell' },
  { id:'plan', title:'Billing & Plan', desc:'Couture Pro · 3 stores · 12 users', status:'Renews 14 May', icon:'CardChip' },
  { id:'integrations', title:'Integrations', desc:'Tally, WhatsApp, Razorpay, Tally Sync', status:'2 disconnected', warn:'Reconnect Tally', icon:'Plug' },
  { id:'modules', title:'Modules', desc:'Toggle inventory, loyalty, gift cards', status:'9 active', icon:'Layers' },
  { id:'preferences', title:'Store Preferences', desc:'Currency, language, SKU & invoice rules', status:'INR · en-IN', icon:'Globe' },
];

// Sales trend data — last 14 days
const SALES_TREND = [
  68, 74, 71, 88, 92, 110, 96,
  82, 95, 102, 119, 128, 121, 134
];
const PROFIT_TREND = SALES_TREND.map(v => Math.round(v * 0.32 + Math.random()*4));
const MONTH_TREND = [
  { m:'Aug', s: 22.4, p: 6.8 },
  { m:'Sep', s: 24.1, p: 7.2 },
  { m:'Oct', s: 28.7, p: 8.6 },
  { m:'Nov', s: 31.2, p: 9.4 },
  { m:'Dec', s: 36.8, p: 11.5 },
  { m:'Jan', s: 27.4, p: 8.1 },
  { m:'Feb', s: 25.9, p: 7.6 },
  { m:'Mar', s: 30.4, p: 9.2 },
  { m:'Apr', s: 32.6, p: 10.1 },
  { m:'May', s: 28.3, p: 8.5 },
];

const TOP_PRODUCTS = [
  { sku:'COU-DSL-2410', name:'Cotton Kurta — Indigo (M)', qty: 142, rev: 184600 },
  { sku:'COU-WTC-0871', name:'Silk Saree — Maroon', qty: 38, rev: 167200 },
  { sku:'COU-ACC-3392', name:'Leather Belt — Tan (32)', qty: 96, rev: 86400 },
  { sku:'COU-FRG-1108', name:'Banarasi Dupatta — Gold', qty: 54, rev: 78300 },
  { sku:'COU-DEN-5520', name:"Men's Slim Denim (32)", qty: 71, rev: 92300 },
  { sku:'COU-WMS-0044', name:'Embroidered Lehenga (S)', qty: 12, rev: 142000 },
];

const RECENT_BILLS = [
  { id:'INV-24850', cust:'Anika Kapoor', time:'14:42', cashier:'Riya S.', counter:'C-1', method:'UPI', status:'Paid', amount: 4280, items: 3 },
  { id:'INV-24849', cust:'Walk-in', time:'14:39', cashier:'Riya S.', counter:'C-1', method:'Cash', status:'Paid', amount: 1240, items: 2 },
  { id:'INV-24848', cust:'Rohit Mehra', time:'14:31', cashier:'Aarav P.', counter:'C-2', method:'Card', status:'Paid', amount: 8650, items: 5 },
  { id:'INV-24847', cust:'Saanvi Iyer', time:'14:18', cashier:'Aarav P.', counter:'C-2', method:'Split', status:'Paid', amount: 12400, items: 7 },
  { id:'INV-24846', cust:'Walk-in', time:'14:09', cashier:'Riya S.', counter:'C-1', method:'UPI', status:'Held', amount: 2100, items: 4 },
  { id:'INV-24845', cust:'Vikram Joshi', time:'13:58', cashier:'Meera D.', counter:'C-3', method:'Card', status:'Refunded', amount: 3450, items: 2 },
  { id:'INV-24844', cust:'Priya Nair', time:'13:51', cashier:'Aarav P.', counter:'C-2', method:'UPI', status:'Paid', amount: 5670, items: 4 },
  { id:'INV-24843', cust:'Walk-in', time:'13:42', cashier:'Riya S.', counter:'C-1', method:'Cash', status:'Paid', amount: 980, items: 1 },
  { id:'INV-24842', cust:'Aditya Sharma', time:'13:33', cashier:'Meera D.', counter:'C-3', method:'UPI', status:'Cancelled', amount: 2850, items: 3 },
  { id:'INV-24841', cust:'Neha Verma', time:'13:21', cashier:'Aarav P.', counter:'C-2', method:'Wallet', status:'Paid', amount: 7320, items: 5 },
  { id:'INV-24840', cust:'Walk-in', time:'13:14', cashier:'Riya S.', counter:'C-1', method:'UPI', status:'Paid', amount: 1850, items: 2 },
  { id:'INV-24839', cust:'Karthik R.', time:'13:02', cashier:'Meera D.', counter:'C-3', method:'Card', status:'Paid', amount: 4150, items: 3 },
];

const INVENTORY = [
  { sku:'COU-DSL-2410', name:'Cotton Kurta — Indigo (M)', cat:'Mens Ethnic', supplier:'Fabindia Mills', avail: 84, reserved: 6, reorder: 30, expiry:'—', value: 100800, status:'In stock', mrp: 1499, cost: 820 },
  { sku:'COU-WTC-0871', name:'Silk Saree — Maroon', cat:'Womens Ethnic', supplier:'Banaras Weaves', avail: 12, reserved: 2, reorder: 20, expiry:'—', value: 52800, status:'Low stock', mrp: 4400, cost: 2200 },
  { sku:'COU-ACC-3392', name:'Leather Belt — Tan (32)', cat:'Accessories', supplier:'Hidesign Co.', avail: 48, reserved: 0, reorder: 25, expiry:'—', value: 21600, status:'In stock', mrp: 899, cost: 450 },
  { sku:'COU-FRG-1108', name:'Banarasi Dupatta — Gold', cat:'Womens Ethnic', supplier:'Banaras Weaves', avail: 0, reserved: 0, reorder: 15, expiry:'—', value: 0, status:'Out of stock', mrp: 1799, cost: 850 },
  { sku:'COU-DEN-5520', name:"Men's Slim Denim (32)", cat:'Mens Western', supplier:'Aravind Mills', avail: 36, reserved: 4, reorder: 20, expiry:'—', value: 50400, status:'In stock', mrp: 1899, cost: 1400 },
  { sku:'COU-WMS-0044', name:'Embroidered Lehenga (S)', cat:'Womens Ethnic', supplier:'Surat Couture', avail: 7, reserved: 1, reorder: 10, expiry:'—', value: 84000, status:'Low stock', mrp: 18000, cost: 12000 },
  { sku:'COU-COS-9912', name:'Lakmé Lipstick — Berry', cat:'Beauty', supplier:'HUL Distribution', avail: 22, reserved: 2, reorder: 15, expiry:'12 Aug 2026', value: 6600, status:'Near expiry', mrp: 399, cost: 240 },
  { sku:'COU-COS-9913', name:'Argan Hair Oil 100ml', cat:'Beauty', supplier:'Forest Essentials', avail: 9, reserved: 0, reorder: 12, expiry:'02 Jul 2026', value: 4500, status:'Near expiry', mrp: 750, cost: 420 },
  { sku:'COU-KID-2202', name:'Kids Ethnic Set (4-5y)', cat:'Kids', supplier:'Surat Couture', avail: 41, reserved: 3, reorder: 20, expiry:'—', value: 36900, status:'In stock', mrp: 1299, cost: 720 },
  { sku:'COU-FTW-7711', name:'Juti Slip-on (UK 8)', cat:'Footwear', supplier:'Hidesign Co.', avail: 18, reserved: 1, reorder: 15, expiry:'—', value: 19800, status:'In stock', mrp: 1599, cost: 920 },
];

const SUPPLIERS = [
  { id:'SUP-001', name:'Fabindia Mills', gstin:'27ABCDE1234F1Z5', terms:'Net 30', lead: 4, payable: 184500, status:'Active', cat:'Apparel', phone:'+91 98201 44322', contact:'Mahesh Iyer', email:'mahesh@fabindiamills.in', credit: 500000, recentPOs: 12 },
  { id:'SUP-002', name:'Banaras Weaves', gstin:'09ZXCVB7766G2H1', terms:'Net 15', lead: 7, payable: 92400, status:'Active', cat:'Sarees', phone:'+91 99114 22008', contact:'Vandana Tripathi', email:'sales@banarasweaves.com', credit: 300000, recentPOs: 8 },
  { id:'SUP-003', name:'Hidesign Co.', gstin:'33LMNOP4499K7T2', terms:'Net 30', lead: 5, payable: 28000, status:'Active', cat:'Leather Goods', phone:'+91 97412 88130', contact:'Arun Pillai', email:'b2b@hidesign.in', credit: 200000, recentPOs: 6 },
  { id:'SUP-004', name:'Aravind Mills', gstin:'07PQRST3322M5R8', terms:'Net 45', lead: 6, payable: 156000, status:'Late', cat:'Denim', phone:'+91 98714 56102', contact:'Karan Gupta', email:'karan@aravindmills.com', credit: 400000, recentPOs: 14 },
  { id:'SUP-005', name:'Surat Couture', gstin:'24EFGHI9988N4D6', terms:'Advance 50%', lead: 10, payable: 0, status:'Active', cat:'Bridal', phone:'+91 99250 71823', contact:'Rina Patel', email:'rina@suratcouture.in', credit: 600000, recentPOs: 5 },
  { id:'SUP-006', name:'HUL Distribution', gstin:'—', terms:'Net 7', lead: 2, payable: 12400, status:'GST missing', cat:'Beauty', phone:'+91 99875 11226', contact:'Sales Desk', email:'orders.mum@hul.com', credit: 100000, recentPOs: 22 },
  { id:'SUP-007', name:'Forest Essentials', gstin:'07JKLMN5544P9Q3', terms:'Net 30', lead: 3, payable: 18900, status:'Active', cat:'Beauty', phone:'+91 98101 33887', contact:'Tanvi Singh', email:'b2b@forestessentials.com', credit: 150000, recentPOs: 9 },
];

const CUSTOMERS = [
  { id:'CUS-1024', name:'Anika Kapoor', phone:'+91 98201 11420', email:'anika.k@gmail.com', tier:'Gold', points: 1840, spend: 142500, lastVisit:'Today, 14:42', avgBill: 4280, gift: 500, segment:'Loyal', visits: 28 },
  { id:'CUS-1025', name:'Rohit Mehra', phone:'+91 99114 88245', email:'rohit.mehra@yahoo.com', tier:'Silver', points: 720, spend: 56800, lastVisit:'Today, 14:31', avgBill: 2840, gift: 0, segment:'Active', visits: 14 },
  { id:'CUS-1026', name:'Saanvi Iyer', phone:'+91 97412 33002', email:'saanvi.iyer@outlook.com', tier:'Gold', points: 2240, spend: 198400, lastVisit:'Today, 14:18', avgBill: 6200, gift: 1000, segment:'Loyal', visits: 22 },
  { id:'CUS-1027', name:'Vikram Joshi', phone:'+91 98714 22117', email:'vjoshi@gmail.com', tier:'Silver', points: 480, spend: 42100, lastVisit:'Today, 13:58', avgBill: 1850, gift: 0, segment:'Active', visits: 9 },
  { id:'CUS-1028', name:'Priya Nair', phone:'+91 99250 67881', email:'priya.nair@gmail.com', tier:'Gold', points: 1620, spend: 124000, lastVisit:'Today, 13:51', avgBill: 3950, gift: 250, segment:'Loyal', visits: 24 },
  { id:'CUS-1029', name:'Aditya Sharma', phone:'+91 99875 44021', email:'aditya.s@hotmail.com', tier:'Bronze', points: 110, spend: 8400, lastVisit:'Today, 13:33', avgBill: 1400, gift: 0, segment:'New', visits: 3 },
  { id:'CUS-1030', name:'Neha Verma', phone:'+91 98101 70014', email:'neha.v@gmail.com', tier:'Silver', points: 640, spend: 38200, lastVisit:'Today, 13:21', avgBill: 2280, gift: 200, segment:'Active', visits: 11 },
  { id:'CUS-1031', name:'Karthik R.', phone:'+91 98452 99014', email:'karthik.r@gmail.com', tier:'Bronze', points: 60, spend: 4150, lastVisit:'Today, 13:02', avgBill: 1380, gift: 0, segment:'New', visits: 2 },
  { id:'CUS-1032', name:'Meera Patel', phone:'+91 98253 14112', email:'meera.p@yahoo.in', tier:'Gold', points: 2980, spend: 256000, lastVisit:'Yesterday, 18:42', avgBill: 7200, gift: 1500, segment:'Loyal', visits: 35 },
  { id:'CUS-1033', name:'Arjun Reddy', phone:'+91 99008 22417', email:'arjun.reddy@gmail.com', tier:'Silver', points: 0, spend: 18400, lastVisit:'12 Mar 2026', avgBill: 1840, gift: 0, segment:'Inactive', visits: 5 },
];

const STAFF = [
  { id:'EMP-101', name:'Riya Sharma', role:'Cashier', shift:'Morning · 10:00-18:00', register:'Counter 1', clock:'09:54', status:'On shift', phone:'+91 98201 44012', sales: 84200, bills: 24, variance: 0, perm:'Billing, Returns (≤₹2K)' },
  { id:'EMP-102', name:'Aarav Pillai', role:'Senior Cashier', shift:'Morning · 10:00-18:00', register:'Counter 2', clock:'09:42', status:'On shift', phone:'+91 99114 22087', sales: 142800, bills: 31, variance: -120, perm:'Billing, Returns (≤₹5K), Discounts' },
  { id:'EMP-103', name:'Meera Desai', role:'Cashier', shift:'Mid · 12:00-20:00', register:'Counter 3', clock:'12:08', status:'Late clock-in', phone:'+91 97412 11445', sales: 38400, bills: 14, variance: 0, perm:'Billing, Returns (≤₹2K)' },
  { id:'EMP-104', name:'Karan Bhatia', role:'Inventory Lead', shift:'Day · 09:00-18:00', register:'—', clock:'09:01', status:'On shift', phone:'+91 98714 60021', sales: 0, bills: 0, variance: 0, perm:'Inventory, Purchase Receiving' },
  { id:'EMP-105', name:'Pooja Menon', role:'Manager', shift:'Day · 09:00-19:00', register:'—', clock:'08:48', status:'On shift', phone:'+91 99250 88002', sales: 0, bills: 0, variance: 0, perm:'All modules · Approval authority' },
  { id:'EMP-106', name:'Suresh Kumar', role:'Cashier', shift:'Evening · 14:00-22:00', register:'Counter 1', clock:'—', status:'Off shift', phone:'+91 99875 33417', sales: 0, bills: 0, variance: 0, perm:'Billing, Returns (≤₹2K)' },
  { id:'EMP-107', name:'Anjali Rao', role:'Floor Associate', shift:'Day · 10:00-19:00', register:'—', clock:'10:11', status:'Late clock-in', phone:'+91 98101 22113', sales: 0, bills: 0, variance: 0, perm:'View only' },
];

const PURCHASES = [
  { po:'PO-2026-0184', sup:'Fabindia Mills', exp:'05 May 2026', ordered: 240, recv: 240, status:'Received', invNum:'FB/24/8821', landed: 4200, total: 196800 },
  { po:'PO-2026-0185', sup:'Banaras Weaves', exp:'07 May 2026', ordered: 60, recv: 22, status:'Partially Received', invNum:'BW/26/0142', landed: 1800, total: 264000 },
  { po:'PO-2026-0186', sup:'Aravind Mills', exp:'02 May 2026', ordered: 180, recv: 0, status:'Sent', invNum:'—', landed: 0, total: 252000 },
  { po:'PO-2026-0187', sup:'Hidesign Co.', exp:'10 May 2026', ordered: 120, recv: 120, status:'Bill Matching', invNum:'HD/26/3309', landed: 800, total: 54000 },
  { po:'PO-2026-0188', sup:'Surat Couture', exp:'14 May 2026', ordered: 24, recv: 0, status:'Draft', invNum:'—', landed: 0, total: 288000 },
  { po:'PO-2026-0189', sup:'HUL Distribution', exp:'04 May 2026', ordered: 80, recv: 80, status:'Received', invNum:'HUL/MUM/8821', landed: 0, total: 19200 },
  { po:'PO-2026-0190', sup:'Forest Essentials', exp:'06 May 2026', ordered: 36, recv: 32, status:'Returns', invNum:'FE/26/2204', landed: 600, total: 15120 },
];

const PAYMENTS = [
  { id:'PAY-99820', inv:'INV-24850', cust:'Anika Kapoor', method:'UPI', amount: 4280, status:'Captured', settle:'T+0', utr:'UTR420041188204' },
  { id:'PAY-99819', inv:'INV-24849', cust:'Walk-in', method:'Cash', amount: 1240, status:'In drawer', settle:'—', utr:'—' },
  { id:'PAY-99818', inv:'INV-24848', cust:'Rohit Mehra', method:'Card', amount: 8650, status:'Captured', settle:'Batch 14:00', utr:'BATCH-14-022' },
  { id:'PAY-99817', inv:'INV-24847', cust:'Saanvi Iyer', method:'Split (Card+UPI)', amount: 12400, status:'Captured', settle:'T+0', utr:'UTR420041188199' },
  { id:'PAY-99816', inv:'INV-24846', cust:'Walk-in', method:'UPI', amount: 2100, status:'Pending', settle:'T+0', utr:'—' },
  { id:'PAY-99815', inv:'INV-24845', cust:'Vikram Joshi', method:'Card', amount: 3450, status:'Refunded', settle:'T+1', utr:'BATCH-13-008' },
  { id:'PAY-99814', inv:'INV-24844', cust:'Priya Nair', method:'UPI', amount: 5670, status:'Captured', settle:'T+0', utr:'UTR420041188177' },
  { id:'PAY-99813', inv:'INV-24842', cust:'Aditya Sharma', method:'UPI', amount: 2850, status:'Failed', settle:'—', utr:'—' },
  { id:'PAY-99812', inv:'INV-24841', cust:'Neha Verma', method:'Wallet (Paytm)', amount: 7320, status:'Captured', settle:'T+1', utr:'PYTM-44-19981' },
];

const EXPENSES = [
  { id:'EXP-2204', cat:'Rent', to:'Sai Properties', amount: 85000, src:'Bank Transfer', status:'Approved', date:'01 May', recv:'Yes' },
  { id:'EXP-2205', cat:'Electricity', to:'Tata Power', amount: 14200, src:'Bank Transfer', status:'Approved', date:'02 May', recv:'Yes' },
  { id:'EXP-2206', cat:'Cleaning', to:'Nimisha Services', amount: 4500, src:'Petty cash', status:'Pending approval', date:'02 May', recv:'No' },
  { id:'EXP-2207', cat:'Packaging', to:'Bharat Packaging', amount: 8200, src:'Petty cash', status:'Approved', date:'03 May', recv:'Yes' },
  { id:'EXP-2208', cat:'Staff snacks', to:'Local vendor', amount: 1200, src:'Petty cash', status:'Pending approval', date:'03 May', recv:'No' },
  { id:'EXP-2209', cat:'Internet', to:'JioFiber', amount: 2400, src:'Bank Transfer', status:'Approved', date:'03 May', recv:'Yes' },
  { id:'EXP-2210', cat:'Repairs', to:'Cool Care AC', amount: 6800, src:'Petty cash', status:'Approved', date:'03 May', recv:'Yes' },
  { id:'EXP-2211', cat:'Marketing', to:'Meta Ads', amount: 12000, src:'Card', status:'Pending approval', date:'03 May', recv:'No' },
];

const RETURNS = [
  { id:'RET-1142', inv:'INV-24820', cust:'Vikram Joshi', items:'1 × Silk Saree', reason:'Color not as expected', amount: 3450, method:'Card refund', status:'Approved', date:'Today, 13:58' },
  { id:'RET-1143', inv:'INV-24795', cust:'Karan Singh', items:'1 × Cotton Kurta (L)', reason:'Size issue', amount: 1499, method:'Store credit', status:'Pending approval', date:'Today, 12:14' },
  { id:'RET-1144', inv:'INV-24710', cust:'Anjali Rao', items:'2 × Lakmé Lipstick', reason:'Wrong shade', amount: 798, method:'UPI refund', status:'Approved', date:'Today, 11:02' },
  { id:'RET-1145', inv:'INV-24681', cust:'Sneha Khanna', items:'1 × Lehenga Set (M)', reason:'Defect in stitching', amount: 18000, method:'Cash refund', status:'Pending approval', date:'Today, 10:42' },
  { id:'RET-1146', inv:'INV-24622', cust:'Sameer Patel', items:'1 × Leather Belt', reason:'Customer dissatisfied', amount: 899, method:'—', status:'Rejected', date:'Yesterday, 18:24' },
  { id:'RET-1147', inv:'INV-24580', cust:'Ritika Bose', items:'3 × Banarasi Dupatta', reason:'Bulk return — bridal cancel', amount: 5397, method:'Bank transfer', status:'Approved', date:'Yesterday, 16:11' },
];

const REGISTERS = [
  { id:'REG-0501-C1', counter:'Counter 1', cashier:'Riya Sharma', open:'10:04', close:'—', opening: 5000, expected: 18420, actual: 18380, variance: -40, status:'Open', sales: 13420, cashIn: 0, cashOut: 0 },
  { id:'REG-0501-C2', counter:'Counter 2', cashier:'Aarav Pillai', open:'10:00', close:'—', opening: 5000, expected: 22840, actual: 22840, variance: 0, status:'Open', sales: 17840, cashIn: 0, cashOut: 0 },
  { id:'REG-0501-C3', counter:'Counter 3', cashier:'Meera Desai', open:'12:08', close:'—', opening: 5000, expected: 9120, actual: 9020, variance: -100, status:'Mismatch', sales: 4120, cashIn: 0, cashOut: 0 },
  { id:'REG-0430-C1', counter:'Counter 1', cashier:'Riya Sharma', open:'10:00', close:'21:42', opening: 5000, expected: 24300, actual: 24300, variance: 0, status:'Closed', sales: 19300, cashIn: 0, cashOut: 0 },
  { id:'REG-0430-C2', counter:'Counter 2', cashier:'Suresh Kumar', open:'14:00', close:'22:08', opening: 5000, expected: 16720, actual: 16660, variance: -60, status:'Closed', sales: 11720, cashIn: 0, cashOut: 0 },
];

const REPORTS = [
  { name:'Daily Sales Summary', purpose:'GST-ready daily P&L', updated:'5 min ago', owner:'Auto · System' },
  { name:'GST Output Report (GSTR-1 ready)', purpose:'Month-wise outward supplies', updated:'Today 02:00', owner:'Auto · System' },
  { name:'Stock Valuation', purpose:'Closing inventory · weighted avg', updated:'Today 02:00', owner:'Karan Bhatia' },
  { name:'Purchase & Vendor Ledger', purpose:'Supplier-wise purchase + payable', updated:'Today 02:00', owner:'Karan Bhatia' },
  { name:'Expense Ledger', purpose:'Category-wise expense + budget', updated:'Today 02:00', owner:'Pooja Menon' },
  { name:'Cashier Performance', purpose:'Bills, sales, variance per cashier', updated:'5 min ago', owner:'Pooja Menon' },
  { name:'Refund & Return Report', purpose:'Returns by reason, by cashier', updated:'5 min ago', owner:'Auto · System' },
  { name:'Customer Loyalty Statement', purpose:'Points earned, redeemed, expiring', updated:'Today 02:00', owner:'Pooja Menon' },
  { name:'Item Movement (ABC)', purpose:'Fast/slow movers · 30 days', updated:'Today 02:00', owner:'Karan Bhatia' },
  { name:'Tax Audit Pack', purpose:'Bills + HSN summary, audit-ready', updated:'Today 02:00', owner:'Auto · System' },
];

window.AppData = {
  fmtINR, fmtINRRaw, NAV, SETTINGS_PAGES,
  SALES_TREND, PROFIT_TREND, MONTH_TREND, TOP_PRODUCTS,
  RECENT_BILLS, INVENTORY, SUPPLIERS, CUSTOMERS, STAFF, PURCHASES,
  PAYMENTS, EXPENSES, RETURNS, REGISTERS, REPORTS,
};

