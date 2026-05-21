// App entry — routes between all 27 screens
const { useState: useApp } = React;

function App() {
  const [active, setActive] = useApp('dashboard');
  const [invItem, setInvItem] = useApp(null);
  const [poItem, setPoItem] = useApp(null);

  const D = window.AppData;
  const { Sidebar, Topbar } = window.Shell;
  const S1 = window.Screens1, S2 = window.Screens2, S3 = window.Screens3, S4 = window.Screens4, S5 = window.Screens5;
  const Set = window.Settings;

  const settingIds = ['business','tax','payments','hardware','team','notifications','plan','integrations','modules','preferences'];
  const settingTitle = (id) => (D.SETTINGS_PAGES.find(s=>s.id===id)||{}).title || id;

  const crumbs = (() => {
    if (active === 'dashboard') return ['Couture POS','Dashboard'];
    if (active === 'billing') return ['Couture POS','Billing'];
    if (active === 'sales') return ['Couture POS','Sales / Orders'];
    if (active === 'register') return ['Couture POS','Register'];
    if (active === 'returns') return ['Couture POS','Returns & Refunds'];
    if (active === 'inventory') return ['Couture POS','Inventory'];
    if (active === 'inventory-detail') return ['Couture POS','Inventory', invItem?.product || 'Item'];
    if (active === 'purchases') return ['Couture POS','Purchases'];
    if (active === 'po-detail') return ['Couture POS','Purchases', poItem?.po || 'PO'];
    if (active === 'suppliers') return ['Couture POS','Suppliers'];
    if (active === 'customers') return ['Couture POS','Customers'];
    if (active === 'staff') return ['Couture POS','Staff'];
    if (active === 'payments') return ['Couture POS','Payments'];
    if (active === 'expenses') return ['Couture POS','Expenses'];
    if (active === 'reports') return ['Couture POS','Reports'];
    if (active === 'analytics') return ['Couture POS','Analytics'];
    if (active === 'settings') return ['Couture POS','Settings'];
    if (settingIds.includes(active)) return ['Couture POS','Settings', settingTitle(active)];
    return ['Couture POS'];
  })();

  const goDetail = (item) => { setInvItem(item); setActive('inventory-detail'); };
  const goPO = (po) => { setPoItem(po); setActive('po-detail'); };
  const setActiveAndReset = (id) => {
    if (id !== 'inventory-detail') setInvItem(null);
    if (id !== 'po-detail') setPoItem(null);
    setActive(id);
  };

  const sidebarActive = (() => {
    if (settingIds.includes(active)) return 'settings';
    return active;
  })();

  let Body;
  switch (active) {
    case 'dashboard': Body = <S1.Dashboard/>; break;
    case 'billing': Body = <S1.Billing/>; break;
    case 'sales': Body = <S1.SalesOrders/>; break;
    case 'register': Body = <S1.Register/>; break;
    case 'returns': Body = <S1.Returns/>; break;
    case 'inventory': Body = <S2.Inventory goDetail={goDetail}/>; break;
    case 'inventory-detail': Body = <S2.InventoryDetail item={invItem || D.INVENTORY[0]} onBack={()=>setActive('inventory')}/>; break;
    case 'purchases': Body = <S2.Purchases goPO={goPO}/>; break;
    case 'po-detail': Body = <S2.PODetail po={poItem || D.PURCHASES[0]} onBack={()=>setActive('purchases')}/>; break;
    case 'suppliers': Body = <S2.Suppliers/>; break;
    case 'customers': Body = <S3.Customers/>; break;
    case 'staff': Body = <S3.Staff/>; break;
    case 'payments': Body = <S4.Payments/>; break;
    case 'expenses': Body = <S4.Expenses/>; break;
    case 'reports': Body = <S5.Reports/>; break;
    case 'analytics': Body = <S5.Analytics/>; break;
    case 'settings': Body = <Set.SettingsHub go={setActiveAndReset}/>; break;
    case 'business': Body = <Set.SetBusiness go={setActiveAndReset}/>; break;
    case 'tax': Body = <Set.SetTax go={setActiveAndReset}/>; break;
    case 'payments-set': Body = <Set.SetPayments go={setActiveAndReset}/>; break;
    case 'hardware': Body = <Set.SetHardware go={setActiveAndReset}/>; break;
    case 'team': Body = <Set.SetTeam go={setActiveAndReset}/>; break;
    case 'notifications': Body = <Set.SetNotifications go={setActiveAndReset}/>; break;
    case 'plan': Body = <Set.SetPlan go={setActiveAndReset}/>; break;
    case 'integrations': Body = <Set.SetIntegrations go={setActiveAndReset}/>; break;
    case 'modules': Body = <Set.SetModules go={setActiveAndReset}/>; break;
    case 'preferences': Body = <Set.SetPreferences go={setActiveAndReset}/>; break;
    default: Body = <S1.Dashboard/>;
  }
  // Map "payments" sidebar nav vs settings/payments collision: hub uses id 'payments' which conflicts.
  // Fix: settings hub uses 'payments-set' for the payment-methods detail.

  // SVG defs (gradient + pattern) available globally
  return (
    <div className="app">
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0058BA"/>
            <stop offset="100%" stopColor="#6C9FFF"/>
          </linearGradient>
          <linearGradient id="brandGradV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0058BA" stopOpacity="0.32"/>
            <stop offset="100%" stopColor="#6C9FFF" stopOpacity="0.02"/>
          </linearGradient>
        </defs>
      </svg>
      <Sidebar active={sidebarActive} setActive={setActiveAndReset}/>
      <div data-screen-label={(crumbs[crumbs.length-1])} style={{minWidth:0}}>
        <Topbar crumbs={crumbs}/>
        {Body}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

