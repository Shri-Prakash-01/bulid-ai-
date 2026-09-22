import React, { useState } from 'react';
import SplashLoading from './components/SplashLoading';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import PortalHeader from './components/PortalHeader';

// User / Homeowner Pages
import UserDashboard from './components/user/UserDashboard';
import CreateProject from './components/user/CreateProject';
import CostEstimation from './components/user/CostEstimation';
import ImageGeneration from './components/user/ImageGeneration';
import FindContractor from './components/user/FindContractor';
import QuotationsRfq from './components/user/QuotationsRfq';
import LoanFeasibility from './components/user/LoanFeasibility';
import ConstructionTracking from './components/user/ConstructionTracking';
import UserPayments from './components/user/UserPayments';
import PublishBidding from './components/user/PublishBidding';
import ProjectConfirmed from './components/user/ProjectConfirmed';

// Contractor Pages
import ContractorDashboard from './components/contractor/ContractorDashboard';
import BusinessProfile from './components/contractor/BusinessProfile';
import VerificationCenter from './components/contractor/VerificationCenter';
import ProjectRequests from './components/contractor/ProjectRequests';
import QuotationBuilder from './components/contractor/QuotationBuilder';
import ContractorProjects from './components/contractor/ContractorProjects';
import ProgressUpdate from './components/contractor/ProgressUpdate';
import MaterialManagement from './components/contractor/MaterialManagement';
import LabourManagement from './components/contractor/LabourManagement';
import ContractorPayments from './components/contractor/ContractorPayments';
import ContractorBidAccept from './components/contractor/ContractorBidAccept';

// Admin Pages
import AdminPortal from './components/AdminPortal';
import UserManagement from './components/admin/UserManagement';
import ContractorManagement from './components/admin/ContractorManagement';
import AdminProjects from './components/admin/AdminProjects';
import CostAdmin from './components/admin/CostAdmin';
import ContractorMatchingAdmin from './components/admin/ContractorMatchingAdmin';
import RfqAdmin from './components/admin/RfqAdmin';
import ConstructionAdmin from './components/admin/ConstructionAdmin';
import InspectionAdmin from './components/admin/InspectionAdmin';
import PaymentAdmin from './components/admin/PaymentAdmin';
import AiMlControlCenter from './components/admin/AiMlControlCenter';
import AiJobsAdmin from './components/admin/AiJobsAdmin';
import ComplaintsDisputes from './components/admin/ComplaintsDisputes';
import AuditLogs from './components/admin/AuditLogs';

import AiChatWidget from './components/AiChatWidget';

export default function App() {
  const [showSplash, setShowSplash]   = useState(true);
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [activePage, setActivePage]   = useState('userDashboard');

  const [currentUser, setCurrentUser] = useState({
    role:  'user',
    name:  'Rajesh Sharma',
    email: 'rajesh.homeowner@buildai.com',
    badge: 'Homeowner / User',
    id:    'user-001'
  });

  const [projectData, setProjectData] = useState({
    length: 40, width: 60,
    city: 'Palo Alto', state: 'CA', zip: '94301',
    facing: 'E', floors: 1,
    constructionType: 'Premium',
    budget: 3750000
  });

  const [roomData, setRoomData] = useState({
    bedrooms: 3, bathrooms: 2, kitchen: 1,
    livingRoom: 1, diningRoom: 1, poojaRoom: 1,
    storeRoom: 1, balcony: 2
  });

  const [styleData, setStyleData] = useState({
    interiorStyle: 'Modern',
    budget: 3750000,
    features: ['Garden', 'Solar', 'EV Charging']
  });

  // ── Bidding Flow State ──────────────────────────────────────────────────────
  // publishedProject : the project object returned from POST /api/projects
  // bids             : array of bids from GET /api/bids?projectId=
  // acceptedBid      : the bid the user has selected
  // activeContract   : contract object returned after contractor confirms
  // aiEstimate       : last AI prediction result (passed through flow)
  const [publishedProject, setPublishedProject] = useState(null);
  const [bids,             setBids]             = useState([]);
  const [acceptedBid,      setAcceptedBid]      = useState(null);
  const [activeContract,   setActiveContract]   = useState(null);
  const [aiEstimate,       setAiEstimate]       = useState(null);
  // For contractor portal: which project they're bidding on & their submitted bid
  const [selectedProject,  setSelectedProject]  = useState(null);
  const [myBid,            setMyBid]            = useState(null);

  const handleLoginSuccess = (profile) => {
    setCurrentUser({ ...profile, id: profile.id || 'user-001' });
    setIsLoggedIn(true);
    if (profile.role === 'contractor') setActivePage('contractorDashboard');
    else if (profile.role === 'admin')  setActivePage('adminDashboard');
    else                                setActivePage('userDashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('userDashboard');
  };

  if (showSplash) return <SplashLoading onFinishLoading={() => setShowSplash(false)} />;
  if (!isLoggedIn) return <AuthPage onLoginSuccess={handleLoginSuccess} />;

  return (
    <div className="min-h-screen bg-[#faf8ff] flex text-[#131b2e] font-body-md">
      <Sidebar
        userRole={currentUser.role}
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <PortalHeader
          currentUser={currentUser}
          onSwitchRole={() => setIsLoggedIn(false)}
          activePage={activePage}
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">

          {/* ── USER PORTAL ─────────────────────────────────────────────── */}
          {currentUser.role === 'user' && (
            <>
              {activePage === 'userDashboard' && (
                <UserDashboard setActivePage={setActivePage} projectData={projectData} />
              )}
              {activePage === 'createProject' && (
                <CreateProject
                  projectData={projectData}   setProjectData={setProjectData}
                  roomData={roomData}         setRoomData={setRoomData}
                  setActivePage={setActivePage}
                />
              )}
              {activePage === 'costEstimation' && (
                <CostEstimation
                  projectData={projectData} roomData={roomData}
                  setActivePage={setActivePage}
                  onEstimateReady={(est) => setAiEstimate(est)}
                />
              )}
              {activePage === 'imageGen' && (
                <ImageGeneration projectData={projectData} />
              )}
              {activePage === 'findContractor' && (
                <FindContractor setActivePage={setActivePage} />
              )}
              {/* Publish project for bidding */}
              {activePage === 'publishBidding' && (
                <PublishBidding
                  projectData={projectData}
                  roomData={roomData}
                  aiEstimate={aiEstimate}
                  currentUser={currentUser}
                  publishedProject={publishedProject}
                  setPublishedProject={setPublishedProject}
                  bids={bids}
                  setBids={setBids}
                  setActivePage={setActivePage}
                />
              )}
              {/* View & accept bids */}
              {activePage === 'quotations' && (
                <QuotationsRfq
                  publishedProject={publishedProject}
                  bids={bids}
                  setBids={setBids}
                  acceptedBid={acceptedBid}
                  setAcceptedBid={setAcceptedBid}
                  setActivePage={setActivePage}
                />
              )}
              {/* Awaiting contractor confirmation / confirmed contract */}
              {activePage === 'projectConfirmed' && (
                <ProjectConfirmed
                  acceptedBid={acceptedBid}
                  activeContract={activeContract}
                  setActiveContract={setActiveContract}
                  publishedProject={publishedProject}
                  setActivePage={setActivePage}
                />
              )}
              {activePage === 'loanFeasibility' && (
                <LoanFeasibility projectData={projectData} />
              )}
              {activePage === 'constructionTracking' && (
                <ConstructionTracking
                  setActivePage={setActivePage}
                  activeContract={activeContract}
                />
              )}
              {activePage === 'userPayments' && (
                <UserPayments projectData={projectData} />
              )}
            </>
          )}

          {/* ── CONTRACTOR PORTAL ───────────────────────────────────────── */}
          {currentUser.role === 'contractor' && (
            <>
              {activePage === 'contractorDashboard' && (
                <ContractorDashboard setActivePage={setActivePage} currentUser={currentUser} />
              )}
              {activePage === 'businessProfile'   && <BusinessProfile />}
              {activePage === 'verificationCenter' && <VerificationCenter />}
              {/* Browse open projects & pick one to bid */}
              {activePage === 'projectRequests' && (
                <ProjectRequests
                  setActivePage={setActivePage}
                  currentUser={currentUser}
                  setSelectedProject={setSelectedProject}
                />
              )}
              {/* Build & submit quote for selectedProject */}
              {activePage === 'quotationBuilder' && (
                <QuotationBuilder
                  setActivePage={setActivePage}
                  currentUser={currentUser}
                  selectedProject={selectedProject}
                  setMyBid={setMyBid}
                />
              )}
              {/* Accept / reject user selection */}
              {activePage === 'bidAccept' && (
                <ContractorBidAccept
                  myBid={myBid}
                  setMyBid={setMyBid}
                  activeContract={activeContract}
                  setActiveContract={setActiveContract}
                  setActivePage={setActivePage}
                  currentUser={currentUser}
                />
              )}
              {activePage === 'contractorProjects' && (
                <ContractorProjects
                  setActivePage={setActivePage}
                  activeContract={activeContract}
                />
              )}
              {activePage === 'progressUpdate'     && <ProgressUpdate activeContract={activeContract} />}
              {activePage === 'materialManagement' && <MaterialManagement />}
              {activePage === 'labourManagement'   && <LabourManagement />}
              {activePage === 'contractorPayments' && <ContractorPayments />}
            </>
          )}

          {/* ── ADMIN PORTAL ────────────────────────────────────────────── */}
          {currentUser.role === 'admin' && (
            <>
              {activePage === 'adminDashboard'         && <AdminPortal currentUser={currentUser} />}
              {activePage === 'userManagement'         && <UserManagement />}
              {activePage === 'contractorManagement'   && <ContractorManagement />}
              {activePage === 'adminProjects'          && <AdminProjects />}
              {activePage === 'costAdmin'              && <CostAdmin />}
              {activePage === 'contractorMatchingAdmin'&& <ContractorMatchingAdmin />}
              {activePage === 'rfqAdmin'               && <RfqAdmin />}
              {activePage === 'constructionAdmin'      && <ConstructionAdmin />}
              {activePage === 'inspectionAdmin'        && <InspectionAdmin />}
              {activePage === 'paymentAdmin'           && <PaymentAdmin />}
              {activePage === 'aiControlCenter'        && <AiMlControlCenter />}
              {activePage === 'aiJobsAdmin'            && <AiJobsAdmin />}
              {activePage === 'complaintsDisputes'     && <ComplaintsDisputes />}
              {activePage === 'auditLogs'              && <AuditLogs />}
            </>
          )}
        </main>
      </div>

      <AiChatWidget propertyData={projectData} styleData={styleData} />
    </div>
  );
}
