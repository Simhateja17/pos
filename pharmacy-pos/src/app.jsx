// App router — switches between all PharmOS screens
const { useState: useApp } = React;

function App() {
  const [active, setActive] = useApp('dashboard');
  const [patient, setPatient] = useApp(null);
  const [invItem, setInvItem] = useApp(null);

  const D = window.AppData;
  const { Sidebar, Topbar } = window.Shell;
  const C = window.ScreensClinical;
  const I = window.ScreensInventory;
  const P = window.ScreensPeople;
  const B = window.ScreensBilling;
  const In = window.ScreensInsights;
  const S = window.ScreensSettings;

  const settingIds = D.SETTINGS_PAGES.map(p => 'set-' + p.id);

  const crumbs = (() => {
    if (active === 'dashboard') return ['PharmOS', 'Dashboard'];
    if (active === 'queue') return ['PharmOS', 'Rx Queue'];
    if (active === 'new-rx') return ['PharmOS', 'New Prescription'];
    if (active === 'checkout') return ['PharmOS', 'Pickup & Checkout'];
    if (active === 'returns') return ['PharmOS', 'Returns'];
    if (active === 'patients') return ['PharmOS', 'Patients'];
    if (active === 'patient-detail') return ['PharmOS', 'Patients', patient ? patient.name : '—'];
    if (active === 'staff') return ['PharmOS', 'Staff'];
    if (active === 'inventory') return ['PharmOS', 'Inventory'];
    if (active === 'inventory-detail') return ['PharmOS', 'Inventory', invItem ? invItem.drug : '—'];
    if (active === 'purchases') return ['PharmOS', 'Purchases'];
    if (active === 'wholesalers') return ['PharmOS', 'Wholesalers'];
    if (active === 'claims') return ['PharmOS', 'PBM Claims'];
    if (active === 'dir') return ['PharmOS', 'DIR Fee Tracker'];
    if (active === 'reports') return ['PharmOS', 'Reports'];
    if (active === 'analytics') return ['PharmOS', 'Analytics'];
    if (active === 'integrations') return ['PharmOS', 'Integrations'];
    if (active === 'settings') return ['PharmOS', 'Settings'];
    if (settingIds.includes(active)) {
      const sp = D.SETTINGS_PAGES.find(p => 'set-' + p.id === active);
      return ['PharmOS', 'Settings', sp ? sp.title : ''];
    }
    return ['PharmOS'];
  })();

  const goPatient = (p) => { setPatient(p); setActive('patient-detail'); };
  const goInv = (it) => { setInvItem(it); setActive('inventory-detail'); };

  const setActiveAndReset = (id) => {
    if (id !== 'patient-detail') setPatient(null);
    if (id !== 'inventory-detail') setInvItem(null);
    setActive(id);
  };

  const sidebarActive = settingIds.includes(active) ? 'settings' : active;

  let Body;
  switch (active) {
    case 'dashboard': Body = <C.Dashboard/>; break;
    case 'queue': Body = <C.RxQueue/>; break;
    case 'new-rx': Body = <C.NewRx/>; break;
    case 'checkout': Body = <C.Checkout/>; break;
    case 'returns': Body = <C.Returns/>; break;
    case 'patients': Body = <P.Patients goDetail={goPatient}/>; break;
    case 'patient-detail': Body = <P.PatientDetail patient={patient || D.PATIENTS[0]} onBack={() => setActive('patients')}/>; break;
    case 'staff': Body = <P.Staff/>; break;
    case 'inventory': Body = <I.Inventory goDetail={goInv}/>; break;
    case 'inventory-detail': Body = <I.InventoryDetail item={invItem || D.INVENTORY[0]} onBack={() => setActive('inventory')}/>; break;
    case 'purchases': Body = <I.Purchases/>; break;
    case 'wholesalers': Body = <I.Wholesalers/>; break;
    case 'claims': Body = <B.Claims/>; break;
    case 'dir': Body = <B.DIRTracker/>; break;
    case 'reports': Body = <In.Reports/>; break;
    case 'analytics': Body = <In.Analytics/>; break;
    case 'integrations': Body = <S.Integrations/>; break;
    case 'settings': Body = <S.SettingsHub go={setActiveAndReset}/>; break;
    default:
      if (settingIds.includes(active)) {
        const id = active.replace('set-', '');
        Body = <S.SettingsPage id={id} go={setActiveAndReset}/>;
      } else {
        Body = <C.Dashboard/>;
      }
  }

  return (
    <div className="app">
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0F5C3A"/>
            <stop offset="100%" stopColor="#4FA875"/>
          </linearGradient>
          <linearGradient id="brandGradV" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F5C3A" stopOpacity="0.32"/>
            <stop offset="100%" stopColor="#4FA875" stopOpacity="0.02"/>
          </linearGradient>
        </defs>
      </svg>
      <Sidebar active={sidebarActive} setActive={setActiveAndReset}/>
      <div data-screen-label={crumbs[crumbs.length - 1]} style={{minWidth:0}}>
        <Topbar crumbs={crumbs}/>
        {Body}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
