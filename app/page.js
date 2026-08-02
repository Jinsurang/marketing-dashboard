'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  Wallet,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Footprints,
  Save,
  LayoutDashboard,
  CalendarDays,
  MousePointerClick,
  PieChart,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Edit2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Tag,
  AlertCircle,
  X,
  Calendar as CalendarIcon,
  Search,
  History,
  FileText,
  Sparkles,
  List,
  Settings,
  Users
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Icons & Assets ---
const WonIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 18V6" /></svg>);
const TossIcon = ({ className }) => (<img src="/toss_logo.png" alt="Toss" className={className} />);
const NaverIcon = ({ className }) => (<img src="/naver_logo.png" alt="Naver" className={className} />);
const MetaIcon = ({ className }) => (<img src="/meta_logo.png" alt="Meta" className={className} />);
const KarrotIcon = ({ className }) => (<img src="/karrot_logo.png" alt="Karrot" className={`${className} object-contain p-[0.5px]`} />);
const CatchtableIcon = ({ className }) => (<img src="/catchtable_logo.png" alt="Catchtable" className={className} />);
const InstaIcon = ({ className }) => (<img src="/instagram_logo.png" alt="Instagram" className={className} />);
const ReviewnoteIcon = ({ className }) => <img src="/reviewnote_logo.png" alt="Reviewnote" className={className} />;

// Custom Icons for Sponsorship Refactor
const GiveIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" className="fill-rose-500 stroke-rose-600" />
    <path d="M12 5 9.04 11h5.92L12 5Z" className="fill-yellow-400 stroke-orange-500" />
    <path d="M15 11v8" className="stroke-orange-500" />
    <path d="M9 11v8" className="stroke-orange-500" />
  </svg>
);

const BlogIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={className}>
    {/* Specific Green 'b' logo design based on user request */}
    <path d="M6 4h3v16H6V4zm6 6c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3zm0 0v6c0 1.66 1.34 3 3 3s3-1.34 3-3V10" stroke="#03C75A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="19" y1="4" x2="19" y2="20" stroke="#03C75A" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// --- Configuration ---
const UI_STRUCTURE = {
  sales: {
    title: "실매출",
    icon: <WonIcon className="w-5 h-5 text-emerald-600" />,
    color: "from-emerald-500 to-teal-500",
    description: "카페/디너 매출 상세 관리",
    columns: [
      { id: 'toss', label: '실매출 상세', color: 'bg-[#212121]', icon: <TossIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'cafe_revenue', label: '카페 매출', type: 'cost' }, { id: 'dinner_revenue', label: '디너 매출', type: 'cost' }] }
    ]
  },
  cost: {
    title: "광고비 관리",
    icon: <Wallet className="w-5 h-5 text-gray-900" />,
    color: "from-gray-900 to-gray-700",
    description: "플랫폼별 예산 및 지출 내역",
    columns: [
      { id: 'smartplace', label: '네이버 검색광고', color: 'bg-[#03C75A]', icon: <NaverIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'cost', label: '비용', type: 'cost' }] },
      { id: 'meta', label: '메타광고', color: 'bg-[#0668E1]', icon: <MetaIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'cost', label: '비용', type: 'cost' }] },
      { id: 'karrot', label: '당근 광고', color: 'bg-[#FF6F0F]', icon: <KarrotIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'cost', label: '비용', type: 'cost' }] },
      { id: 'hyupchan', label: '협찬광고', color: 'bg-rose-500', icon: <GiveIcon className="w-5 h-5" />, fields: [{ id: 'cost', label: '총 비용', type: 'cost' }] },

    ]
  },

  inflow: {
    title: "유입지표",
    icon: <MousePointerClick className="w-5 h-5 fill-blue-500 text-blue-600" />,
    color: "from-blue-500 to-indigo-500",
    description: "주요 채널 노출 및 방문 데이터",
    columns: [
      { id: 'smartplace', label: '네이버 스마트플레이스', color: 'bg-[#03C75A]', icon: <NaverIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'exposure', label: '노출', type: 'number' }, { id: 'click', label: '클릭', type: 'number' }, { id: 'call', label: '전화', type: 'number' }] },
      {
        id: 'catchtable', label: '캐치테이블', color: 'bg-[#FF3D00]', icon: <CatchtableIcon className="w-4 h-4 rounded-sm" />, fields: [
          { id: 'res_count', label: '예약 건수' }, { id: 'res_people', label: '예약 인원' },
          { id: 'walk_count', label: '워크인 건수' }, { id: 'walk_people', label: '워크인 인원' }
        ]
      }
    ]
  },
  review: {
    title: "리뷰 관리",
    icon: <Star className="w-5 h-5 fill-amber-400 text-amber-500" />,
    color: "from-amber-500 to-orange-500",
    description: "신규 등록 리뷰 모니터링",
    columns: [
      { id: 'smartplace', label: '네이버 스마트플레이스', color: 'bg-[#03C75A]', icon: <NaverIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'review', label: '신규 리뷰', type: 'number' }] },
      { id: 'catchtable', label: '캐치테이블', color: 'bg-[#FF3D00]', icon: <CatchtableIcon className="w-4 h-4 rounded-sm" />, fields: [{ id: 'review', label: '신규 리뷰', type: 'number' }] }
    ]
  }
};

const formatDate = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstDate = new Date(utc + (9 * 60 * 60000));
    return `${kstDate.getFullYear()}-${String(kstDate.getMonth() + 1).padStart(2, '0')}`;
  });
  const [monthlyData, setMonthlyData] = useState({});
  const [allData, setAllData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState('thisMonth'); // thisMonth, today, yesterday, 7d, 90d, 1y

  // --- Settings State ---
  const [mainManager, setMainManager] = useState('윤세현');
  const [leadDeveloper, setLeadDeveloper] = useState('진수랑');
  const [isEditingManager, setIsEditingManager] = useState(false);
  const [isEditingDeveloper, setIsEditingDeveloper] = useState(false);

  // --- Modals State ---
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [targetDate, setTargetDate] = useState(formatDate(new Date()));

  // --- Staging State (Inside Modal) ---
  const [quickCampaigns, setQuickCampaigns] = useState({});
  const [quickNumeric, setQuickNumeric] = useState({});
  const [deletedCampaignIds, setDeletedCampaignIds] = useState([]); // Track deleted IDs
  const [expandedPlatform, setExpandedPlatform] = useState(null);
  const [activePlaceTab, setActivePlaceTab] = useState('hq'); // For Smart Place dual location
  const [urlList, setUrlList] = useState(Array(7).fill('')); // Max 7 URLs
  const [showUrlModal, setShowUrlModal] = useState(false); // URL Config Modal

  // Load URLs from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('dashboard_urls');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Ensure array length is 7
          const filled = [...parsed, ...Array(7).fill('')].slice(0, 7);
          setUrlList(filled);
        }
      } catch (e) { console.error("Failed to load URLs", e); }
    }
  }, []);

  const handleOpenUrls = () => {
    const validUrls = urlList.filter(u => u && u.trim() !== '');
    if (validUrls.length === 0) {
      setShowUrlModal(true);
      return;
    }

    // Calculate Dynamic Dates (KST)
    const now = new Date();
    const kstOffset = 9 * 60; // KST is UTC+9
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstDate = new Date(utc + (kstOffset * 60000));

    // Today YYYY-MM-DD
    const todayStr = kstDate.toISOString().split('T')[0];

    // Yesterday YYYY-MM-DD
    const yesterdayDate = new Date(utc + (kstOffset * 60000));
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    validUrls.forEach(url => {
      let target = url.trim();
      if (!target.startsWith('http')) target = 'https://' + target;

      // Replace placeholders
      target = target.replace(/{today}/g, todayStr).replace(/{yesterday}/g, yesterdayStr);

      window.open(target, '_blank');
    });
  };

  const saveUrls = (newUrls) => {
    setUrlList(newUrls);
    localStorage.setItem('dashboard_urls', JSON.stringify(newUrls));
    setShowUrlModal(false);
  };

  const handleUrlInput = (index, value) => {
    // Auto-replace ANY YYYY-MM-DD date with {yesterday}
    const dateRegex = /\d{4}-\d{2}-\d{2}/g;

    let smartValue = value;
    if (dateRegex.test(smartValue)) {
      smartValue = smartValue.replace(dateRegex, '{yesterday}');
    }



    const newUrls = [...urlList];
    newUrls[index] = smartValue;
    setUrlList(newUrls);
  };

  // --- Trend & Analytics Helpers ---
  const formatDateLocal = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const getDatesForRange = (range) => {
    // Determine the "Reference Date" based on currentMonth state
    // If currentMonth is the actual current calendar month => Use Today
    // If currentMonth is a past month => Use the Last Day of that month
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kstNow = new Date(utc + (9 * 60 * 60000));
    const realCurrentMonthStr = `${kstNow.getFullYear()}-${String(kstNow.getMonth() + 1).padStart(2, '0')}`;

    let refDate;
    if (currentMonth === realCurrentMonthStr) {
      // If we are looking at the actual current calendar month -> Reference is TODAY (KST)
      refDate = new Date(kstNow);
    } else {
      // If we are looking at a past month -> Reference is the LAST DAY of that month
      const [y, m] = currentMonth.split('-').map(Number);
      refDate = new Date(y, m, 0); // Last day of month
    }

    refDate.setHours(0, 0, 0, 0);
    const yesterday = new Date(refDate);
    yesterday.setDate(refDate.getDate() - 1);

    const dates = [];
    const prevDates = [];

    let days = 0;
    if (range === 'yesterday') {
      const ds = formatDate(yesterday);
      const pds = new Date(yesterday);
      pds.setDate(yesterday.getDate() - 1);
      return { current: [ds], previous: [formatDate(pds)] };
    }
    else if (range === 'thisMonth') {
      const [y, m] = currentMonth.split('-').map(Number);
      const lastDay = new Date(y, m, 0).getDate();

      for (let i = 1; i <= lastDay; i++) {
        dates.push(`${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
      }

      // Previous Period: Same date range in previous month
      let py = y;
      let pm = m - 1;
      if (pm === 0) {
        pm = 12;
        py = y - 1;
      }

      const currentMaxDay = Math.max(...dates.map(d => parseInt(d.split('-')[2])));
      const pLastDay = new Date(py, pm, 0).getDate();
      const compareDays = Math.min(currentMaxDay, pLastDay);

      for (let i = 1; i <= compareDays; i++) {
        prevDates.push(`${py}-${String(pm).padStart(2, '0')}-${String(i).padStart(2, '0')}`);
      }
      return { current: dates, previous: prevDates };
    }
    else if (range === '1week') days = 7;
    else if (range === '1month') days = 31; // Rolling 1 Month (e.g. Jan 26 ~ Dec 26)
    else if (range === '3months') days = 90;
    else if (range === '1y') days = 365;

    // Generic day subtraction for other ranges (1w, 1m, 3m, 1y)
    // Start from 'yesterday' to ensure complete data entries
    for (let i = 0; i < days; i++) {
      const d = new Date(yesterday);
      d.setDate(yesterday.getDate() - i);
      dates.push(formatDate(d));

      const pd = new Date(yesterday);
      pd.setDate(yesterday.getDate() - i - days);
      prevDates.push(formatDate(pd));
    }
    return { current: dates.reverse(), previous: prevDates.reverse() };
  };

  const aggregateData = (dates) => {
    let cost = 0, revenue = 0, inflow = 0;
    // New breakdown metrics
    let resCount = 0, resPeople = 0, walkCount = 0, walkPeople = 0;
    let oldVisitor = 0, oldRes = 0; // Legacy support

    dates.forEach(ds => {
      const ym = ds.substring(0, 7);
      const mData = allData[ym] || {};

      // Cost & Revenue
      Object.keys(mData).forEach(p => {
        if (p !== 'campaigns') {
          const dData = mData[p]?.[ds] || {};
          cost += dData.cost || 0;

          if (p === 'toss') {
            revenue += (dData.cafe_revenue || 0) + (dData.dinner_revenue || 0) + (dData.revenue || 0);
          } else {
            revenue += dData.revenue || 0;
          }
        }
      });

      // Inflow & Visitor Logic
      const sp = mData.smartplace?.[ds] || {};
      const spInflow = Number(sp.hq_exposure || 0) + Number(sp.dorim_exposure || 0);
      inflow += spInflow;

      // Catchtable Logic (New & Legacy)
      const ct = mData.catchtable?.[ds] || {};
      // New fields
      resCount += Number(ct.res_count) || 0;
      resPeople += Number(ct.res_people) || 0;
      walkCount += Number(ct.walk_count) || 0;
      walkPeople += Number(ct.walk_people) || 0;

      // Fallback: If no new fields, use legacy
      if (!ct.res_count && ct.reservation) {
        resCount += Number(ct.reservation) || 0; // Legacy map to count
      }
      if (!ct.walk_count && ct.walkin) {
        walkCount += Number(ct.walkin) || 0; // Legacy map to count
      }
    });

    // Aggregates
    const visitorCount = resCount + walkCount;
    const visitorPeople = resPeople + walkPeople;

    return {
      cost,
      revenue,
      inflow,

      // Old interface for compat (using Count as 'visitor')
      visitor: visitorCount,

      // Breakdown for Dashboards
      visitorCount,
      visitorPeople,
      resCount,
      resPeople,
      walkCount,
      walkPeople,

      roas: cost > 0 ? (revenue / cost) * 100 : 0,
      aov: visitorCount > 0 ? Math.round(revenue / visitorCount) : 0
    };
  };

  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) {
      // 이전 값이 0이면 플래그 숨김 (비교 불가)
      return null;
    }
    return ((current - previous) / previous) * 100;
  };

  const deleteCampaign = async (internalId) => {
    if (!window.confirm('정말 이 캠페인을 삭제하시겠습니까? 관련 데이터가 모두 삭제됩니다.')) return;

    const target = (monthlyData.campaigns || []).find(c => c.id === internalId);
    if (!target) {
      const fallback = (monthlyData.campaigns || []).find(c => (c.campaignId === internalId || c.title === internalId));
      if (!fallback) return;
      deleteLegacyCampaign(fallback);
      return;
    }

    let newData = { ...monthlyData };
    newData.campaigns = (newData.campaigns || []).filter(c => c.id !== internalId);

    // Synchronize the platform's data
    newData = syncDailyDataForPlatform(target.platform, newData.campaigns, newData);

    setMonthlyData(newData);
    await persistData(newData);
    alert('캠페인이 삭제되었습니다.');
  };

  const deleteLegacyCampaign = async (target) => {
    const newData = { ...monthlyData };
    newData.campaigns = (newData.campaigns || []).filter(c => c !== target);
    setMonthlyData(newData);
    await persistData(newData);
    alert('레거시 캠페인이 삭제되었습니다.');
  };

  const syncDailyDataForPlatform = (platformId, masterCampaigns, existingMonthlyData) => {
    const newData = { ...existingMonthlyData };
    if (!newData[platformId]) newData[platformId] = {};

    // 1. Reset costs and counts for this platform's existing dates
    Object.keys(newData[platformId]).forEach(date => {
      newData[platformId][date] = { ...newData[platformId][date], cost: 0, campaign_count: 0 };
    });

    // 2. Re-calculate based on current master campaigns
    masterCampaigns.filter(c => c.platform === platformId).forEach(c => {
      if (c.period && c.period.includes(' ~ ')) {
        const [startS, endS] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));

        // Apply total cost only to the start date
        if (!newData[platformId][startS]) newData[platformId][startS] = {};
        const dayRef = newData[platformId][startS];
        dayRef.cost = (dayRef.cost || 0) + (parseFloat(c.cost) || 0);
        dayRef.campaign_count = (dayRef.campaign_count || 0) + 1;
      }
    });

    // Clean up empty objects
    Object.keys(newData[platformId]).forEach(date => {
      const day = newData[platformId][date];
      if (day.cost === 0 && day.campaign_count === 0 && Object.keys(day).length <= 2) {
        delete newData[platformId][date];
      }
    });

    return newData;
  };

  useEffect(() => {
    async function loadAllData() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/data', { cache: 'no-store' }); // No month param means all data
        const data = await res.json();
        setAllData(data || {});

        const currentMonthData = data[currentMonth] || {};
        setMonthlyData(currentMonthData);

        if (data['config']) {
          if (data['config'].mainManager) setMainManager(data['config'].mainManager);
          if (data['config'].leadDeveloper) setLeadDeveloper(data['config'].leadDeveloper);
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAllData();
  }, [currentMonth]);

  const saveSettings = async (newManager, newDeveloper) => {
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: 'settings', data: { mainManager: newManager, leadDeveloper: newDeveloper } })
      });
    } catch (err) {
      console.error("Failed to save settings", err);
    }
  };

  const persistData = async (data = monthlyData) => {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ month: currentMonth, data })
      });

      if (!res.ok) {
        let errorMsg = 'Unknown Error';
        try {
          const errData = await res.json();
          errorMsg = errData.error || JSON.stringify(errData);
        } catch (e) {
          errorMsg = await res.text();
        }
        alert(`❌ 저장 실패!\n\n서버 응답: ${errorMsg}\n상태 코드: ${res.status}`);
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      alert(`저장 중 네트워크 오류가 발생했습니다: ${err.message}`);
      return false;
    }
  };

  const handleQuickSave = async () => {
    let newData = { ...monthlyData };
    const today = formatDate(new Date());
    const dateToSave = targetDate;

    // Validation: Check if all new campaigns have a title
    for (const platformId of Object.keys(quickCampaigns)) {
      const campaigns = quickCampaigns[platformId] || [];
      if (campaigns.some(c => !c.title.trim())) {
        alert('캠페인 제목을 입력해주세요.');
        return;
      }
    }

    // 1. Process Simple Numeric Data FIRST (Preserve non-cost fields)
    Object.keys(quickNumeric).forEach(platformId => {
      if (!newData[platformId]) newData[platformId] = {};
      newData[platformId][dateToSave] = { ...(newData[platformId][dateToSave] || {}), ...quickNumeric[platformId] };
    });

    // 2. Process Campaign-based Data SECOND (Campaigns always have the final word on cost)
    Object.keys(quickCampaigns).forEach(platformId => {
      const campaigns = quickCampaigns[platformId] || [];
      const dateStrForFilter = dateToSave.replace(/-/g, '.');

      // Smart Update: Filter out campaigns that are (Being Updated OR Deleted)
      // This preserves campaigns on other dates that were not loaded/edited
      const activeIds = new Set(campaigns.map(c => c.id));
      const deletedIds = new Set(deletedCampaignIds);

      const filteredMaster = (newData.campaigns || []).filter(c => !activeIds.has(c.id) && !deletedIds.has(c.id));

      const campaignsWithPlatform = campaigns.map(c => {
        let active = true;
        const start = c.startDate || targetDate;
        const end = c.endDate || targetDate;
        const period = `${start.replace(/-/g, '.')} ~ ${end.replace(/-/g, '.')}`;
        if (today < start || today > end) active = false;
        const { startDate, endDate, id, ...rest } = c;
        // Keep unique internal ID if it exists, else create new
        return { ...rest, id: id || Date.now() + Math.random(), period, platform: platformId, active };
      });

      newData.campaigns = [...filteredMaster, ...campaignsWithPlatform];

      // Synchronize all days for this platform (This will correctly overwrite the 'cost' field from step 1)
      newData = syncDailyDataForPlatform(platformId, newData.campaigns, newData);
    });

    setMonthlyData(newData);
    const success = await persistData(newData);
    if (success) {
      setQuickCampaigns({});
      setQuickNumeric({});
      setDeletedCampaignIds([]);
      setIsInputModalOpen(false);
      // alert(`${dateToSave} 데이터가 성공적으로 저장되었습니다!`); // User requested quiet handling for better UX
    }
  };

  const updateQuickNumeric = (platform, field, value) => {
    let parsed = 0;
    if (typeof value === 'string') {
      parsed = parseFloat(value.replace(/,/g, '')) || 0;
    } else if (typeof value === 'number') {
      parsed = value;
    }
    setQuickNumeric(prev => ({ ...prev, [platform]: { ...(prev[platform] || {}), [field]: parsed } }));
  };

  const addQuickCampaignRow = (platformId) => {
    setQuickCampaigns(prev => ({ ...prev, [platformId]: [...(prev[platformId] || []), { id: Date.now(), title: '', campaignId: '', cost: '', startDate: targetDate, endDate: targetDate, memo: '' }] }));
  };

  const formatValue = (val, type) => {
    if (val === undefined || val === null || val === '') return '';
    if (type === 'cost' || type === 'number') return Number(val).toLocaleString();
    return val;
  };

  // --- Aggregate Calculation ---
  const getMonthlyTotal = (categoryKey) => {
    const category = UI_STRUCTURE[categoryKey];
    let totals = {};
    category.columns.forEach(col => {
      col.fields.forEach(f => {
        const fieldKey = `${col.id}_${f.id}`;
        let sum = 0;
        Object.values(monthlyData[col.id] || {}).forEach(day => { sum += day[f.id] || 0; });
        totals[fieldKey] = { label: `${col.label} ${f.label}`, value: sum, unit: f.type === 'cost' ? '원' : '건/명' };
      });
    });
    return totals;
  };

  // --- Render Modals ---
  const renderInputModal = () => {
    if (!isInputModalOpen) return null;
    const category = UI_STRUCTURE[activeTab];
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsInputModalOpen(false)}></div>
        <div className="bg-white rounded-[40px] w-full max-w-4xl shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] flex flex-col">
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-900 text-white rounded-2xl"><Plus className="w-6 h-6" /></div>
              <div><h3 className="text-xl font-bold text-gray-900">{targetDate} 상세 입력</h3><p className="text-sm text-gray-400 font-medium">{category.title} 데이터 기록 중</p></div>
            </div>
            <button onClick={() => setIsInputModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6" /></button>
          </div>

          <div className="p-8 overflow-y-auto flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.columns.map(col => (
                <div key={col.id} className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    {col.icon ? col.icon : <div className={`w-1.5 h-4 rounded-full ${col.color}`}></div>}
                    <span className="text-sm font-bold text-gray-900">{col.label}</span>
                  </div>
                  {activeTab === 'cost' ? (
                    <div className="space-y-4">
                      {(quickCampaigns[col.id] || []).map((c) => (
                        <div key={c.id} className="bg-gray-50/50 p-5 rounded-2xl space-y-4 relative group border border-gray-100/50 shadow-sm">
                          <button onClick={() => {
                            setDeletedCampaignIds(prev => [...prev, c.id]);
                            setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].filter(curr => curr.id !== c.id) }));
                          }} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded-lg"><X className="w-4 h-4" /></button>

                          {/* Sponsorship Channel Selector */}
                          {col.id === 'hyupchan' && (
                            <div className="grid grid-cols-2 gap-3 mb-2">
                              <button
                                onClick={() => setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, channelType: 'instagram' } : curr) }))}
                                className={`p-3 rounded-xl flex items-center justify-center gap-2 border-2 transition-all ${c.channelType === 'instagram' || !c.channelType ? 'bg-white border-pink-500 text-pink-600 shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-400'}`}
                              >
                                <InstaIcon className="w-5 h-5" />
                                <span className="text-xs font-black">인스타그램</span>
                              </button>
                              <button
                                onClick={() => setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, channelType: 'blog' } : curr) }))}
                                className={`p-3 rounded-xl flex items-center justify-center gap-2 border-2 transition-all ${c.channelType === 'blog' ? 'bg-white border-[#03C75A] text-[#03C75A] shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-100 text-gray-400'}`}
                              >
                                <BlogIcon className="w-5 h-5" />
                                <span className="text-xs font-black">블로그</span>
                              </button>
                            </div>
                          )}

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-gray-400 ml-1">캠페인 제목</span>
                            <input type="text" placeholder="제목을 입력하세요" className="w-full p-3.5 rounded-xl border-none bg-white text-sm font-bold outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" value={c.title} onChange={e => setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, title: e.target.value } : curr) }))} />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-gray-400 ml-1">집행 비용</span>
                              <div className="relative group/input">
                                <input type="text" placeholder="0" className="w-full p-3.5 pr-10 rounded-xl border-none bg-white text-sm font-black text-blue-600 outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" value={(parseFloat(c.cost) || 0).toLocaleString()} onChange={e => {
                                  const val = e.target.value.replace(/[^0-9]/g, '');
                                  setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, cost: val } : curr) }));
                                }} />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none group-focus-within/input:text-blue-400 transition-colors">원</span>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-gray-400 ml-1">캠페인 기간</span>
                              <div className="grid grid-cols-2 gap-2">
                                <input type="date" className="p-3 rounded-xl border-none bg-white text-[10px] font-bold outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" value={c.startDate || targetDate} onChange={e => setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, startDate: e.target.value } : curr) }))} />
                                <input type="date" className="p-3 rounded-xl border-none bg-white text-[10px] font-bold outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" value={c.endDate || targetDate} onChange={e => setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, endDate: e.target.value } : curr) }))} />
                              </div>
                            </div>
                          </div>

                          {/* Per-Campaign CTR Input (If applicable) */}
                          {/* Per-Campaign CTR Input (Always show for SmartPlace, Meta & Karrot) */}
                          {(col.id === 'smartplace' || col.id === 'meta' || col.id === 'karrot') && (
                            <div className="space-y-1.5 pt-2">
                              <span className="text-[10px] font-bold text-gray-400 ml-1">광고 클릭율 (CTR)</span>
                              <div className="relative group/input">
                                <input type="number" step="0.01" placeholder="0" className="w-full p-3.5 pr-10 rounded-xl border-none bg-white text-sm font-black text-gray-900 outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" value={c.ctr || ''} onChange={e => {
                                  setQuickCampaigns(prev => ({ ...prev, [col.id]: prev[col.id].map(curr => curr.id === c.id ? { ...curr, ctr: e.target.value } : curr) }));
                                }} />
                                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none group-focus-within/input:text-blue-400 transition-colors">%</span>
                              </div>
                            </div>
                          )
                          }
                        </div>
                      ))}
                      {/* Daily Fields for Cost Tab (e.g., Daily CTR for Naver) */}
                      {col.fields.filter(f => f.id !== 'cost').length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">일별 고정 지표</h4>
                          {col.fields.filter(f => f.id !== 'cost').map(field => (
                            <div key={field.id} className="space-y-1.5">
                              <span className="text-[10px] font-bold text-gray-400 ml-1">{field.label}</span>
                              <div className="relative group/input">
                                <input type="number" step="0.01" className="w-full p-4 rounded-2xl bg-gray-50 border-none font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                                  value={quickNumeric[col.id]?.[field.id] || ''}
                                  onChange={e => updateQuickNumeric(col.id, field.id, e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none group-focus-within/input:text-blue-500 transition-colors">%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button onClick={() => addQuickCampaignRow(col.id)} className="w-full py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-xs font-bold hover:border-blue-200 hover:text-blue-500 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2 mt-4"><Plus className="w-4 h-4" /> 캠페인 추가</button>
                    </div>
                  ) : col.id === 'toss' ? (
                    // Custom Logic for Real Sales (Toss)
                    (() => {
                      const savedData = quickNumeric[col.id] || {};
                      const cafe = parseFloat(savedData.cafe_revenue) || 0;
                      const dinner = parseFloat(savedData.dinner_revenue) || 0;
                      const total = cafe + dinner;

                      return (
                        <div className="space-y-4">
                          {/* Virtual Total Input */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-gray-400 ml-1">실매출 (Total)</span>
                            <div className="relative group/input">
                              <input type="text" className="w-full p-4 rounded-2xl bg-blue-50/50 border-none font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-xl transition-all shadow-inner"
                                value={total.toLocaleString()}
                                onChange={e => {
                                  const newTotal = parseInt(e.target.value.replace(/[^0-9]/g, '') || '0', 10);
                                  // Logic: Dinner = Total - Cafe
                                  updateQuickNumeric(col.id, 'dinner_revenue', newTotal - cafe);
                                }}
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none">(원)</span>
                            </div>
                          </div>

                          {/* Cafe Input */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-gray-400 ml-1">카페 매출</span>
                            <div className="relative group/input">
                              <input type="text" className="w-full p-4 rounded-2xl bg-gray-50 border-none font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner"
                                value={cafe.toLocaleString()}
                                onChange={e => {
                                  const newCafe = parseInt(e.target.value.replace(/[^0-9]/g, '') || '0', 10);
                                  // Logic: Maintain Total, Recalculate Dinner
                                  const currentTotal = cafe + dinner; // Keep current total fixed? Or allow it to change?
                                  // User scenario: "I insert Real Sales and Cafe Sales."
                                  // This implies Total is fixed input. Cafe is fixed input.
                                  // If I change Cafe, and Total was 100, Dinner becomes 100 - newCafe.
                                  updateQuickNumeric(col.id, 'cafe_revenue', newCafe);
                                  updateQuickNumeric(col.id, 'dinner_revenue', total - newCafe);
                                }}
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none">(원)</span>
                            </div>
                          </div>

                          <p className="text-[10px] font-bold text-gray-400 pl-1 gap-1 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            자동 계산된 디너 매출: <span className="text-gray-900 font-bold">{dinner.toLocaleString()}원</span>
                          </p>
                        </div>
                      );
                    })()
                  ) : col.id === 'smartplace' && activeTab === 'inflow' ? (
                    // Custom Logic for Smart Place (Dual Location + Weekly Period) - ONLY for Inflow Tab
                    (() => {
                      const savedData = quickNumeric[col.id] || {};

                      // Helper to get/set values
                      const getVal = (prefix, field) => savedData[`${prefix}_${field}`];
                      const setVal = (prefix, field, val) => updateQuickNumeric(col.id, `${prefix}_${field}`, val);

                      const renderPlaceForm = (prefix) => (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
                          <div className="bg-blue-50/50 p-5 rounded-[24px] space-y-4 border border-blue-100/50">
                            <h4 className="text-xs font-black text-blue-900 flex items-center gap-2"><MousePointerClick className="w-4 h-4" /> 플레이스 유입 통계</h4>
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-gray-400 ml-1">이번주 총 유입수</span>
                              <div className="relative group/input">
                                <input type="text" className="w-full p-4 rounded-2xl bg-white border-none font-black text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-xl transition-all shadow-sm"
                                  value={formatValue(getVal(prefix, 'exposure'), 'number')}
                                  onChange={e => setVal(prefix, 'exposure', e.target.value.replace(/[^0-9]/g, ''))}
                                  onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none">회</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );

                      return (
                        <div className="space-y-4">
                          {/* Period Selector */}
                          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-xl">
                            <span className="text-[10px] font-bold text-gray-500 px-2">기간</span>
                            <input type="date" className="bg-white rounded-lg px-2 py-1 text-xs font-bold text-gray-700 outline-none"
                              value={savedData.period_start || targetDate}
                              onChange={e => updateQuickNumeric(col.id, 'period_start', e.target.value)}
                            />
                            <span className="text-gray-300">~</span>
                            <input type="date" className="bg-white rounded-lg px-2 py-1 text-xs font-bold text-gray-700 outline-none"
                              value={savedData.period_end || targetDate}
                              onChange={e => updateQuickNumeric(col.id, 'period_end', e.target.value)}
                            />
                          </div>

                          {/* Tabs */}
                          <div className="flex p-1 bg-gray-100 rounded-xl gap-1">
                            <button onClick={() => setActivePlaceTab('hq')} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${activePlaceTab === 'hq' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>작은따옴표</button>
                            <button onClick={() => setActivePlaceTab('dorim')} className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${activePlaceTab === 'dorim' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>도림천점(HQ)</button>
                          </div>

                          {/* Content */}
                          {renderPlaceForm(activePlaceTab)}
                        </div>
                      );
                    })()
                  ) : (col.id === 'catchtable' && activeTab === 'inflow') ? (
                    // Custom 2x2 Input Grid for Catchtable
                    <div className="space-y-4">
                      {/* Reservation */}
                      <div className="bg-gray-50/50 p-4 rounded-2xl space-y-2 border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400">예약 고객</span>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative group/input">
                            <input type="number" placeholder="0" className="w-full p-3 rounded-xl bg-white border-none font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                              value={quickNumeric[col.id]?.['res_count'] || ''}
                              onChange={e => updateQuickNumeric(col.id, 'res_count', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none">건</span>
                          </div>
                          <div className="relative group/input">
                            <input type="number" placeholder="0" className="w-full p-3 rounded-xl bg-white border-none font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                              value={quickNumeric[col.id]?.['res_people'] || ''}
                              onChange={e => updateQuickNumeric(col.id, 'res_people', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none">명</span>
                          </div>
                        </div>
                      </div>

                      {/* Walk-in */}
                      <div className="bg-gray-50/50 p-4 rounded-2xl space-y-2 border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400">워크인 고객</span>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="relative group/input">
                            <input type="number" placeholder="0" className="w-full p-3 rounded-xl bg-white border-none font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                              value={quickNumeric[col.id]?.['walk_count'] || ''}
                              onChange={e => updateQuickNumeric(col.id, 'walk_count', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none">건</span>
                          </div>
                          <div className="relative group/input">
                            <input type="number" placeholder="0" className="w-full p-3 rounded-xl bg-white border-none font-bold text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-sm"
                              value={quickNumeric[col.id]?.['walk_people'] || ''}
                              onChange={e => updateQuickNumeric(col.id, 'walk_people', e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-300 pointer-events-none">명</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {col.fields.map(field => (
                        <div key={field.id} className="space-y-1.5">
                          <span className="text-[10px] font-bold text-gray-400 ml-1">{field.label}</span>
                          <div className="relative group/input">
                            <input type="text" className={`w-full ${field.type === 'cost' ? 'pr-10' : ''} p-4 rounded-2xl bg-gray-50 border-none font-black text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all shadow-inner`} value={formatValue(quickNumeric[col.id]?.[field.id], field.type)} onChange={e => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              updateQuickNumeric(col.id, field.id, val);
                            }}
                              onKeyDown={(e) => e.key === 'Enter' && handleQuickSave()}
                            />
                            {field.type === 'cost' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none group-focus-within/input:text-blue-500 transition-colors">(원)</span>}
                            {/* Unit Handling: Default to '건' for standard number inputs like reviews */}
                            {field.type !== 'cost' && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-300 pointer-events-none group-focus-within/input:text-blue-500 transition-colors">건</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-end gap-3">
            <button onClick={() => setIsInputModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-all">취소</button>
            <button onClick={handleQuickSave} className="px-10 py-3 bg-gray-900 text-white font-bold rounded-2xl shadow-xl shadow-gray-200 hover:bg-black transition-all hover:-translate-y-0.5 flex items-center gap-2"><Save className="w-4 h-4" /> 기록 저장하기</button>
          </div>
        </div>
      </div >
    );
  };

  const renderHistoryModal = () => {
    if (!isHistoryModalOpen) return null;
    const category = UI_STRUCTURE[activeTab];

    const dayRecords = category.columns.map(col => {
      const data = monthlyData[col.id]?.[targetDate];
      const campaigns = (monthlyData.campaigns || []).filter(c => c.platform === col.id && c.period && c.period.includes(targetDate.replace(/-/g, '.')));
      return { platform: col, data, campaigns };
    }).filter(r => r.data || r.campaigns.length > 0);

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsHistoryModalOpen(false)}></div>
        <div className="bg-white rounded-[40px] w-full max-w-3xl shadow-2xl relative animate-in slide-in-from-bottom-4 duration-300 overflow-hidden max-h-[85vh] flex flex-col">
          <div className="p-8 flex justify-between items-center bg-gray-900 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl"><History className="w-6 h-6 text-blue-400" /></div>
              <div><h3 className="text-xl font-bold">{targetDate} 상세 이력</h3><p className="text-sm text-gray-400 font-medium">{category.title} 데이터 리포트</p></div>
            </div>
            <button onClick={() => setIsHistoryModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
          </div>

          <div className="p-8 overflow-y-auto flex-1 bg-gray-50/30">
            {dayRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="w-12 h-12 text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold">기록된 데이터가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {dayRecords.map((record, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-6">
                      {record.platform.icon ? record.platform.icon : <div className={`w-1.5 h-6 rounded-full ${record.platform.color}`}></div>}
                      <h4 className="text-lg font-black text-gray-900">{record.platform.label}</h4>
                    </div>

                    {record.campaigns.length > 0 ? (
                      <div className="space-y-4">
                        {record.campaigns.map((c, cIdx) => (
                          <div key={cIdx} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-white">
                            <div>
                              <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                {c.platform === 'hyupchan' && c.channelType === 'instagram' && <InstaIcon className="w-4 h-4" />}
                                {c.platform === 'hyupchan' && c.channelType === 'blog' && <BlogIcon className="w-4 h-4" />}
                                {c.title} <span className="text-[10px] text-gray-400 font-mono">ID: {c.campaignId}</span>
                              </div>
                              <div className="text-[10px] text-blue-500 font-bold mt-1 uppercase tracking-wider">{c.period}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-gray-900">{(parseFloat(c.cost) || 0).toLocaleString()}원</div>
                              {c.memo && <div className="text-[10px] text-gray-400 font-medium italic mt-0.5">"{c.memo}"</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : record.data ? (
                      record.platform.id === 'smartplace' ? (
                        // Custom History for Smart Place (Simplified Dual Location)
                        (() => {
                          const renderBranchDetails = (prefix, label, color) => {
                            const inflow = parseFloat(record.data[`${prefix}_exposure`]) || 0;
                            return (
                              <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className={`text-xs font-black ${color}`}>{label}</span>
                                  <span className="text-sm font-black text-gray-900">{inflow.toLocaleString()} <small className="text-[10px] text-gray-400">회</small></span>
                                </div>
                              </div>
                            );
                          };

                          return (
                            <div className="space-y-4">
                              {record.data.period_start && (
                                <div className="text-center py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-400">
                                  {record.data.period_start} ~ {record.data.period_end}
                                </div>
                              )}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderBranchDetails('hq', '작은따옴표', 'text-blue-600')}
                                {renderBranchDetails('dorim', '도림천점(HQ)', 'text-emerald-600')}
                              </div>
                            </div>
                          );
                        })()
                      ) : record.platform.id === 'toss' ? (
                        // Custom History Hierarchical Display for Real Sales
                        (() => {
                          const cafe = record.data?.cafe_revenue || 0;
                          const dinner = record.data?.dinner_revenue || 0;
                          const total = cafe + dinner;
                          return (
                            <div className="space-y-4">
                              <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-start border border-blue-100">
                                <span className="font-extrabold text-blue-900 text-xs flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 실매출 총액
                                </span>
                                <span className="font-black text-2xl text-gray-900 tracking-tight">{total.toLocaleString()} <small className="text-sm text-gray-400 font-bold">원</small></span>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 border border-gray-100 rounded-xl bg-white">
                                  <div className="text-[10px] font-bold text-gray-400 mb-1">카페 매출</div>
                                  <div className="font-bold text-gray-700 text-sm">{cafe.toLocaleString()} 원</div>
                                </div>
                                <div className="p-3 border border-gray-100 rounded-xl bg-white">
                                  <div className="text-[10px] font-bold text-gray-400 mb-1">디너 매출</div>
                                  <div className="font-bold text-gray-700 text-sm">{dinner.toLocaleString()} 원</div>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {record.platform.fields.map(f => (
                            <div key={f.id} className="bg-gray-50/50 p-4 rounded-2xl flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 mb-1">{f.label}</span>
                              <span className="text-xl font-black text-gray-900">{(record.data[f.id] || 0).toLocaleString()} <small className="text-xs font-bold text-gray-400">{f.type === 'cost' ? '원' : '건/명'}</small></span>
                            </div>
                          ))}
                        </div>
                      )
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-400 font-medium flex items-center gap-2"><Search className="w-3.5 h-3.5" /> 각 항목은 저장 시점의 캠페인 정보를 기반으로 출력됩니다.</p>
            <button
              onClick={() => {
                setIsHistoryModalOpen(false);

                // Pre-populate quick states for editing
                const initialCampaigns = {};
                const initialNumeric = {};

                category.columns.forEach(col => {
                  // 1. Campaigns: Search with safety for period-less legacy data
                  const platformCampaigns = (monthlyData.campaigns || []).filter(c => {
                    if (c.platform !== col.id) return false;
                    if (!c.period || !c.period.includes(' ~ ')) return false;
                    const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
                    return targetDate >= start && targetDate <= end;
                  });

                  if (platformCampaigns.length > 0) {
                    initialCampaigns[col.id] = platformCampaigns.map(c => {
                      const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
                      return {
                        ...c,
                        id: c.id || Date.now() + Math.random(), // Preserve ID or Stable Gen
                        startDate: start,
                        endDate: end,
                        cost: c.cost?.toString() || '0'
                      };
                    });
                  }

                  // 2. Numeric Data (Direct day records)
                  const dayData = monthlyData[col.id]?.[targetDate];
                  if (dayData) {
                    initialNumeric[col.id] = { ...dayData };
                  }
                });

                setQuickCampaigns(initialCampaigns);
                setQuickNumeric(initialNumeric);
                setIsInputModalOpen(true);
              }}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all"
            >
              <Edit2 className="w-4 h-4" /> 내용 수정하기
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUrlModal = () => {
    if (!showUrlModal) return null;
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] animate-in fade-in duration-200">
        <div className="bg-white w-[500px] rounded-[32px] p-8 shadow-2xl scale-[1.02] border border-white/20 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
            <div>
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                <List className="w-6 h-6 text-blue-600" /> 데이터 보드 URL 설정
              </h3>
              <p className="text-xs text-gray-400 font-bold mt-1.5 ml-8">한 번에 열고 싶은 데이터 시트/사이트 주소를 입력하세요 (최대 7개)</p>
            </div>
            <button onClick={() => setShowUrlModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900"><X className="w-6 h-6" /></button>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl mb-6">
            <h4 className="text-xs font-black text-blue-600 mb-1">💡 동적 날짜 변수 사용 팁</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              URL에 <span className="font-bold text-blue-600">{`{today}`}</span> 또는 <span className="font-bold text-blue-600">{`{yesterday}`}</span>를 입력하면,
              버튼을 누르는 시점의 날짜(YYYY-MM-DD)로 자동 변환되어 열립니다.<br />
              예) <code className="bg-white px-1 py-0.5 rounded text-gray-500">...startDate={'{yesterday}'}&endDate={'{yesterday}'}</code>
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8 max-h-[400px] overflow-y-auto px-1">
            {urlList.map((url, i) => (
              <div key={i} className="flex item-center gap-3">
                <span className="text-sm font-black text-gray-400 w-6 py-3 text-center">{i + 1}</span>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleUrlInput(i, e.target.value)}
                  placeholder="https://..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-300"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setUrlList(Array(7).fill(''))} className="px-6 py-4 rounded-xl font-black text-gray-500 hover:bg-gray-100 transition-all">초기화</button>
            <button onClick={() => saveUrls(urlList)} className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-black hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 active:scale-[0.98]">설정 저장하기</button>
          </div>
        </div>
      </div>
    );
  };

  // --- SVG Charts ---
  const LineChart = ({ data, height = 300 }) => {
    const [hoverIdx, setHoverIdx] = useState(null);
    const { labels, datasets } = data;
    const paddingX = 80;
    const paddingY = 40;
    const width = 800;

    // Separate datasets by Axis
    const leftDatasets = datasets.filter(d => !d.yAxisID || d.yAxisID === 'left' || d.yAxisID === 'cost'); // Include cost in left
    const rightDatasets = datasets.filter(d => d.yAxisID === 'right');
    // const costDatasets = ... (Removed dedicated axis)

    // Helper: Calculate Axis Scale
    const calculateScale = (ds) => {
      const dataMax = Math.max(...ds.flatMap(d => d.data));
      const rawMax = dataMax > 0 ? dataMax : 100;
      const targetTicks = 5;
      const roughStep = rawMax / targetTicks;
      const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
      const normalizedStep = roughStep / magnitude;

      let niceStep;
      if (normalizedStep <= 1) niceStep = 1;
      else if (normalizedStep <= 2) niceStep = 2;
      else if (normalizedStep <= 5) niceStep = 5;
      else niceStep = 10;

      const step = niceStep * magnitude;
      const maxVal = Math.ceil(rawMax / step) * step;
      return { step, maxVal };
    };

    const leftScale = calculateScale(leftDatasets);
    const rightScale = rightDatasets.length > 0 ? calculateScale(rightDatasets) : { step: 100, maxVal: 100 };
    // const costScale = ... (Removed)

    const getX = (i) => paddingX + (i * (width - paddingX - 60) / (labels.length - 1 || 1));
    const getYLeft = (v) => height - paddingY - (v * (height - paddingY * 2) / leftScale.maxVal);
    const getYRight = (v) => height - paddingY - (v * (height - paddingY * 2) / rightScale.maxVal);
    // const getYCost = ... (Removed)

    const leftGridLines = [];
    for (let v = 0; v <= leftScale.maxVal; v += leftScale.step) leftGridLines.push(v);

    return (
      <div className="relative w-full h-full group/chart">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseMove={(e) => {
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const x = ((e.clientX - rect.left) * width) / rect.width;
            const relativeX = x - paddingX;
            const idx = Math.round((relativeX * (labels.length - 1)) / (width - paddingX - 60));
            if (idx >= 0 && idx < labels.length) setHoverIdx(idx);
            else setHoverIdx(null);
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Left Axis Grid & Labels */}
          {leftGridLines.map(v => {
            const y = getYLeft(v);
            return (
              <g key={`l-${v}`}>
                <line x1={paddingX} y1={y} x2={width - 60} y2={y} stroke="#f2f4f6" strokeWidth="1" />
                <text x={paddingX - 15} y={y} dominantBaseline="middle" textAnchor="end" className="text-[10px] font-black fill-gray-300">{v.toLocaleString()}</text>
              </g>
            );
          })}

          {/* Right Axis Labels (Only if right datasets exist) */}
          {(() => {
            const rightTicks = [];
            for (let v = 0; v <= rightScale.maxVal; v += rightScale.step) rightTicks.push(v);
            return rightTicks.map(v => (
              <text key={`r-${v}`} x={width - 50} y={getYRight(v)} dominantBaseline="middle" textAnchor="start" className="text-[10px] font-black fill-blue-300">{v.toLocaleString()}</text>
            ));
          })()}


          {/* X Axis Labels */}
          {labels.map((l, i) => {
            const count = labels.length;
            let show = false;

            if (count <= 14) show = true;
            else if (count <= 100) show = i === 0 || i === count - 1 || i % 10 === 0;
            else show = i === 0 || i === count - 1 || i % 30 === 0;

            return show && (
              <text key={i} x={getX(i)} y={height - 15} textAnchor="middle" className="text-[10px] font-black fill-gray-300">{l}</text>
            );
          })}

          {/* Paths & Bars */}
          {/* Paths & Bars */}
          {datasets.map((ds, idx) => {
            let getY = getYLeft;
            if (ds.yAxisID === 'right') getY = getYRight;
            if (ds.yAxisID === 'cost') getY = getYLeft; // Revert cost to left axis

            if (ds.type === 'bar') {
              // Dynamic Bar Width
              const count = labels.length;
              let barWidth = 12;
              if (count <= 7) barWidth = 40; // Week: Very wide
              else if (count <= 35) barWidth = 12; // Month: Standard
              else barWidth = 4; // Year/3Months: Thin
              return (
                <g key={idx}>
                  {ds.data.map((v, i) => {
                    const x = getX(i) - barWidth / 2;
                    const y = getY(v);
                    const h = height - paddingY - y;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={h}
                        fill={ds.backgroundColor || ds.borderColor}
                        rx="2"
                        className="transition-all duration-1000 hover:opacity-100"
                      />
                    );
                  })}
                </g>
              );
            }

            // Filter out null values for continuous graph effect
            const validPoints = ds.data.map((v, i) => v !== null ? { x: getX(i), y: getY(v) } : null).filter(p => p !== null);
            const pointsStr = validPoints.map(p => `${p.x},${p.y}`).join(' ');
            const lastPoint = validPoints[validPoints.length - 1];

            return (
              <g key={idx}>
                <polyline points={pointsStr} fill="none" stroke={ds.borderColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={ds.borderDash ? "6 6" : "0"} className="transition-all duration-1000" />
                {ds.fill && validPoints.length > 0 && (
                  <path d={`M ${validPoints[0].x} ${getY(0)} L ${pointsStr} L ${lastPoint.x} ${getY(0)} Z`} fill={ds.backgroundColor} className="opacity-20" />
                )}
                {/* Data Point Markers */}
                {validPoints.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="white" stroke={ds.borderColor} strokeWidth="2" />
                ))}
              </g>
            );
          })}

          {/* Hover Indicator */}
          {hoverIdx !== null && (
            <g className="pointer-events-none animate-in fade-in duration-300">
              <line x1={getX(hoverIdx)} y1={paddingY} x2={getX(hoverIdx)} y2={height - paddingY} stroke="#3182f6" strokeWidth="1" strokeDasharray="4 4" />
              {datasets.map((ds, i) => {
                let getY = getYLeft;
                if (ds.yAxisID === 'right') getY = getYRight;
                if (ds.yAxisID === 'cost') getY = getYLeft; // Revert cost to left axis
                return ds.data[hoverIdx] !== null && (
                  <circle key={i} cx={getX(hoverIdx)} cy={getY(ds.data[hoverIdx])} r="5" fill="white" stroke={ds.borderColor} strokeWidth="3" />
                );
              })}
            </g>
          )}
        </svg>

        {/* Floating Tooltip */}
        {
          hoverIdx !== null && (
            <div
              className="absolute z-50 pointer-events-none bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[140px] animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{
                left: `${(getX(hoverIdx) / width) * 100}%`,
                top: '10%',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="text-[10px] font-black text-gray-400 border-b border-white/10 pb-2 mb-1">{labels[hoverIdx]}</div>
              {datasets.map((ds, i) => (
                <div key={i} className="flex justify-between items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-300">{ds.label}</span>
                  <span className="text-xs font-black">
                    {ds.fullData ? (ds.fullData[hoverIdx] || 0).toLocaleString() + '원' : (ds.data[hoverIdx] || 0).toLocaleString() + (ds.unit || (ds.yAxisID === 'right' ? '명' : '원'))}
                  </span>
                </div>
              ))}
            </div>
          )
        }
      </div >
    );
  };

  const StackedBarChart = ({ data, height = 300 }) => {
    const [hoverIdx, setHoverIdx] = useState(null);
    const { labels, datasets } = data;
    const paddingX = 60;
    const paddingY = 40;
    const width = 800;

    // Calculate annual max (Sum of all stacks)
    const totals = labels.map((_, i) => datasets.reduce((sum, ds) => sum + (ds.data[i] || 0), 0));
    const maxVal = Math.max(...totals, 10); // Minimum 10 scale
    const niceMax = Math.ceil(maxVal / 5) * 5; // Round up to nearest 5

    const getX = (i) => paddingX + (i * (width - paddingX * 2) / (labels.length - 1 || 1));
    const getY = (v) => height - paddingY - (v * (height - paddingY * 2) / niceMax);
    const barWidth = 20;

    return (
      <div className="relative w-full h-full group/chart">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseMove={(e) => {
            const svg = e.currentTarget;
            const rect = svg.getBoundingClientRect();
            const x = ((e.clientX - rect.left) * width) / rect.width;
            // Find closest bar
            let closest = null;
            let minDist = Infinity;
            labels.forEach((_, i) => {
              const bx = getX(i);
              const dist = Math.abs(x - bx);
              if (dist < minDist && dist < (width / labels.length) / 2) {
                minDist = dist;
                closest = i;
              }
            });
            setHoverIdx(closest);
          }}
          onMouseLeave={() => setHoverIdx(null)}
        >
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(p => {
            const v = Math.round(niceMax * p);
            const y = getY(v);
            return (
              <g key={p}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#f2f4f6" strokeWidth="1" />
                <text x={paddingX - 10} y={y} dominantBaseline="middle" textAnchor="end" className="text-[10px] font-black fill-gray-300">{v}</text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {labels.map((l, i) => (
            <text key={i} x={getX(i)} y={height - 15} textAnchor="middle" className="text-[10px] font-black fill-gray-300">{l}</text>
          ))}

          {/* Stacked Bars */}
          {labels.map((_, i) => {
            let currentY = 0;
            return (
              <g key={i} className="transition-all duration-300">
                {datasets.map((ds, dIdx) => {
                  const val = ds.data[i] || 0;
                  if (val === 0) return null;
                  const h = (val / niceMax) * (height - paddingY * 2);
                  const y = getY(currentY + val); // Top of this segment
                  currentY += val;

                  return (
                    <rect
                      key={dIdx}
                      x={getX(i) - barWidth / 2}
                      y={y}
                      width={barWidth}
                      height={h}
                      fill={ds.color}
                      className={`transition-all duration-500 ${hoverIdx !== null && hoverIdx !== i ? 'opacity-30' : 'opacity-100'}`}
                      rx="2"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoverIdx !== null && (
          <div
            className="absolute z-50 pointer-events-none bg-gray-900 text-white p-4 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[140px] animate-in fade-in zoom-in-50 duration-200"
            style={{
              left: `${(getX(hoverIdx) / width) * 100}%`,
              top: '20%',
              transform: 'translateX(-50%)'
            }}
          >
            <div className="text-[10px] font-black text-gray-400 border-b border-white/10 pb-2 mb-1">{labels[hoverIdx]}</div>
            {datasets.map((ds, i) => {
              const val = ds.data[hoverIdx] || 0;
              if (val === 0) return null;
              return (
                <div key={i} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: ds.color }}></div>
                    <span className="text-[10px] font-bold text-gray-300">{ds.label}</span>
                  </div>
                  <span className="text-xs font-black">{val}건</span>
                </div>
              );
            })}
            <div className="border-t border-white/10 pt-2 flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-400">Total</span>
              <span className="text-xs font-black">{totals[hoverIdx]}건</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const DonutChart = ({ data, size = 260 }) => {
    const [hovered, setHovered] = useState(null);
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = -90;
    const center = size / 2;
    const radius = size * 0.35;
    const thickness = size * 0.18;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {total === 0 ? (
            <circle cx={center} cy={center} r={radius} fill="none" stroke="#f2f4f6" strokeWidth={thickness} />
          ) : data.map((d, i) => {
            if (d.value === 0) return null;
            const sliceAngle = (d.value / total) * 360;
            const isHovered = hovered === i;
            const displayThickness = isHovered ? thickness + 4 : thickness;

            if (sliceAngle >= 359.9) {
              return (
                <circle
                  key={i} cx={center} cy={center} r={radius} fill="none"
                  stroke={d.color} strokeWidth={displayThickness}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="transition-all duration-300 cursor-pointer"
                />
              );
            }

            const x1 = center + radius * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((currentAngle * Math.PI) / 180);
            currentAngle += sliceAngle;
            const x2 = center + radius * Math.cos((currentAngle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((currentAngle * Math.PI) / 180);
            const largeArcFlag = sliceAngle > 180 ? 1 : 0;

            return (
              <path
                key={i}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                fill="none"
                stroke={d.color}
                strokeWidth={displayThickness}
                strokeLinecap="butt"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="hover:opacity-90 transition-all duration-300 cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute flex flex-col items-center pointer-events-none animate-in fade-in zoom-in-50 duration-300">
          <span className="text-[9px] font-black text-gray-400 mb-1 tracking-tighter uppercase">
            {hovered !== null ? data[hovered].label.split(' ')[0] : 'TOTAL'}
          </span>
          <span className="text-xl font-black text-gray-900 tracking-tighter leading-none">
            {hovered !== null
              ? Math.round((data[hovered].value / total) * 100) + '%'
              : total.toLocaleString()}
          </span>
        </div>
      </div>
    );
  };

  const BarChart = ({ data, height = 240 }) => {
    const maxVal = Math.max(...data.map(d => d.value), 10);
    const width = 600;
    const padding = 40;
    const barWidth = (width - padding * 2) / data.length * 0.6;
    const gap = (width - padding * 2) / data.length * 0.4;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Y Axis Grid */}
        {[0, 0.5, 1].map(p => {
          const y = height - padding - (p * (height - padding * 2));
          return <line key={p} x1={padding} y1={y} x2={width - padding} y2={y} stroke="#f2f4f6" strokeWidth="1" />;
        })}
        {data.map((d, i) => {
          const bH = (d.value / maxVal) * (height - padding * 2);
          const x = padding + i * (barWidth + gap) + gap / 2;
          const y = height - padding - bH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={bH} fill={d.color || '#3182f6'} rx="6" className="hover:opacity-80 transition-all duration-500" />
              <text x={x + barWidth / 2} y={height - 20} textAnchor="middle" className="text-[10px] font-black fill-gray-500">{d.label}</text>
              <text x={x + barWidth / 2} y={y - 10} textAnchor="middle" className="text-[10px] font-black fill-gray-900">{d.value.toFixed(2)}%</text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderDashboard = () => {
    const { current: currentDates, previous: previousDates } = getDatesForRange(selectedRange);
    const curr = aggregateData(currentDates);
    const prev = aggregateData(previousDates);

    const isThisMonth = selectedRange === 'thisMonth';

    const trends = {
      cost: isThisMonth ? calculateTrend(curr.cost, prev.cost) : null,
      inflow: isThisMonth ? calculateTrend(curr.inflow, prev.inflow) : null,
      revenue: isThisMonth ? calculateTrend(curr.revenue, prev.revenue) : null,
      visitor: isThisMonth ? calculateTrend(curr.visitor, prev.visitor) : null,
      roas: isThisMonth ? (curr.roas - prev.roas) : null
    };



    const rangeOptions = [
      { id: 'thisMonth', label: '이번달' },
      { id: 'yesterday', label: '어제' },
      { id: '1week', label: '일주일' },
      { id: '1month', label: '1개월' },
      { id: '3months', label: '3개월' },
      { id: '1y', label: '1년' }
    ];

    // --- Dynamic Chart Data ---
    const lineData = {
      labels: currentDates.map(d => {
        const [y, m, day] = d.split('-');
        return `${parseInt(m)}월 ${parseInt(day)}일`;
      }),
      datasets: [
        {
          label: '매출',
          type: 'bar', // Change Revenue to Bar
          data: currentDates.map(ds => {
            const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
            if (selectedRange === 'thisMonth' && ds >= todayStr) return null;
            const ym = ds.substring(0, 7);
            const mData = allData[ym] || {};
            const val = Object.keys(mData).reduce((acc, p) => {
              if (p === 'campaigns') return acc;
              const d = mData[p]?.[ds] || {};
              if (p === 'toss') {
                return acc + (d.cafe_revenue || 0) + (d.dinner_revenue || 0);
              }
              return acc + (d.revenue || 0);
            }, 0);
            return Math.round(val / 10000); // Unit: Ten Thousand (Shown as 백만원 label)
          }),
          fullData: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const mData = allData[ym] || {};
            return Object.keys(mData).reduce((acc, p) => {
              if (p === 'campaigns') return acc;
              const d = mData[p]?.[ds] || {};
              if (p === 'toss') return acc + (d.cafe_revenue || 0) + (d.dinner_revenue || 0);
              return acc + (d.revenue || 0);
            }, 0);
          }),
          backgroundColor: 'rgba(56, 189, 248, 0.5)', // Sky Blue 50%
          barThickness: 10,
          unit: '백만원'
        },
        {
          label: '광고비',
          type: 'line',
          data: currentDates.map(ds => {
            const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Seoul' });
            if (selectedRange === 'thisMonth' && ds >= todayStr) return null;
            const ym = ds.substring(0, 7);
            const mData = allData[ym] || {};
            const val = Object.keys(mData).reduce((acc, p) => acc + (p !== 'campaigns' ? (mData[p]?.[ds]?.cost || 0) : 0), 0);
            return val > 0 ? Math.round(val / 1000) : null; // Unit: Thousand
          }),
          fullData: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const mData = allData[ym] || {};
            return Object.keys(mData).reduce((acc, p) => acc + (p !== 'campaigns' ? (mData[p]?.[ds]?.cost || 0) : 0), 0);
          }),
          borderColor: '#F57E4F', // Orange Red
          borderWidth: 2,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#F57E4F',
          unit: '천원'
        },
        {
          label: '유입량',
          yAxisID: 'right', // Right Axis
          type: 'line',
          data: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const mData = allData[ym] || {};
            return Object.keys(mData).reduce((acc, p) => {
              if (p === 'campaigns') return acc;
              const d = mData[p]?.[ds] || {};
              if (p === 'smartplace') {
                return acc + (parseFloat(d.hq_exposure) || 0) + (parseFloat(d.dorim_exposure) || 0);
              }
              return acc + (d.reservation || 0) + (d.walkin || 0);
            }, 0);
          }),
          borderColor: '#298AD5', // Blue
          borderDash: [5, 5],
          borderWidth: 2,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#298AD5',
          unit: '회'
        }
      ]
    };

    const donutData = UI_STRUCTURE.cost.columns.map(col => {
      const spend = currentDates.reduce((sum, ds) => {
        const ym = ds.substring(0, 7);
        return sum + (allData[ym]?.[col.id]?.[ds]?.cost || 0);
      }, 0);
      const colorMatch = col.color.match(/#[a-fA-F0-9]{6}/);
      const hexColor = colorMatch ? colorMatch[0] : '#3182f6';
      return { label: col.label, value: spend, color: hexColor };
    }).filter(d => d.value > 0);

    const ctrLineData = {
      labels: currentDates.map(ds => ds.substring(8, 10) + '일'),
      datasets: [
        {
          label: '네이버 검색광고 (CTR)',
          data: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const daily = parseFloat(allData[ym]?.smartplace?.[ds]?.ctr) || 0;
            if (daily > 0) return daily;
            // Fallback to campaign (simplified for line chart)
            const camp = (monthlyData.campaigns || []).find(c => {
              if (c.platform !== 'smartplace' || !c.ctr) return false;
              const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
              return ds >= start && ds <= end;
            });
            return camp ? parseFloat(camp.ctr) || 0 : 0;
          }),
          borderColor: '#03C75A',
          unit: '%'
        },
        {
          label: '메타광고 (CTR)',
          data: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const daily = parseFloat(allData[ym]?.meta?.[ds]?.ctr) || 0;
            if (daily > 0) return daily;
            const camp = (monthlyData.campaigns || []).find(c => {
              if (c.platform !== 'meta' || !c.ctr) return false;
              const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
              return ds >= start && ds <= end;
            });
            return camp ? parseFloat(camp.ctr) || 0 : 0;
          }),
          borderColor: '#0668E1',
          unit: '%'
        },
        {
          label: '당근 광고 (CTR)',
          data: currentDates.map(ds => {
            const ym = ds.substring(0, 7);
            const daily = parseFloat(allData[ym]?.karrot?.[ds]?.ctr) || 0;
            if (daily > 0) return daily;
            const camp = (monthlyData.campaigns || []).find(c => {
              if (c.platform !== 'karrot' || !c.ctr) return false;
              const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
              return ds >= start && ds <= end;
            });
            return camp ? parseFloat(camp.ctr) || 0 : 0;
          }),
          borderColor: '#FF6F0F',
          unit: '%'
        }
      ]
    };

    // --- Stacked Bar Data (Annual Review Trend) ---
    const reviewColumns = UI_STRUCTURE.review.columns;
    const yearPrefix = currentMonth.split('-')[0];
    const months = Array.from({ length: 12 }, (_, i) => `${yearPrefix}-${String(i + 1).padStart(2, '0')}`);

    const stackedReviewData = {
      labels: months.map(m => `${parseInt(m.split('-')[1])}월`),
      datasets: reviewColumns.map(col => {
        const data = months.map(m => {
          const mData = allData[m]?.[col.id];
          if (!mData) return 0;
          // Sum up review counts for the month
          return Object.values(mData).reduce((sum, day) => sum + (day.review || 0), 0);
        });

        // Assign specific colors
        let color = '#CBD5E1'; // Default Gray
        if (col.id === 'smartplace') color = '#03C75A'; // Naver Green
        if (col.id === 'catchtable') color = '#FF3D00'; // Catchtable Red
        // Check UI_STRUCTURE for others
        const uiColor = col.color.match(/#[a-fA-F0-9]{6}/);
        if (uiColor) color = uiColor[0];

        return {
          label: col.label + ' 리뷰',
          data,
          color
        };
      })
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-wrap gap-2 mb-2 p-1.5 bg-gray-100/50 rounded-2xl w-fit">
          {rangeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelectedRange(opt.id)}
              className={`px-6 py-2.5 rounded-xl text-[11px] font-black transition-all ${selectedRange === opt.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <KpiCard title="총 매출" value={curr.revenue} unit="원" icon={<img src="/icon_rev.png" alt="Revenue" />} trend={trends.revenue}>
            <div className="absolute bottom-7 right-7 flex flex-col items-end">
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                건당 객단가 {curr.aov ? curr.aov.toLocaleString() : 0}원
              </span>
            </div>
          </KpiCard>

          <KpiCard title="총 광고비" value={curr.cost} unit="원" icon={<img src="/icon_ad.png" alt="Ad" />} trend={trends.cost}>
            <div className="absolute bottom-7 right-7 flex flex-col items-end">
              <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-md">
                ROAS {Math.round(curr.roas)}%
              </span>
            </div>
          </KpiCard>

          <KpiCard
            title="총 방문객"
            value={
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-gray-900 tracking-tighter">{curr.visitorCount.toLocaleString()}</span>
                <span className="text-sm font-black text-gray-400">건</span>
                <span className="text-gray-300 mx-1">/</span>
                <span className="text-3xl font-black text-gray-900 tracking-tighter">{curr.visitorPeople.toLocaleString()}</span>
                <span className="text-sm font-black text-gray-400">명</span>
              </div>
            }
            unit=""
            icon={<img src="/walk_real.png" alt="Visitor" className="w-5 h-5" />}
            trend={trends.visitor}
          >
            <div className="absolute bottom-4 right-6 flex flex-col gap-1 text-right">
              <span className="text-[10px] font-bold text-gray-400">
                예약 고객 <span className="text-gray-900 ml-1">{curr.resCount.toLocaleString()}건 / {curr.resPeople.toLocaleString()}명</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400">
                워크인 고객 <span className="text-gray-900 ml-1">{curr.walkCount.toLocaleString()}건 / {curr.walkPeople.toLocaleString()}명</span>
              </span>
            </div>
          </KpiCard>

          <KpiCard title="총 유입수" value={curr.inflow} unit="회" icon={<img src="/icon_users.png" alt="Inflow" className="w-5 h-5" />} trend={trends.inflow} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-sm font-black text-gray-900 tracking-tight">광고비 대비 매출 추이 (ROAS 분석)</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-2 h-2 rounded-full bg-sky-400"></div> 매출 <span className="text-[9px] text-gray-300">(백만원)</span></div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-3 h-0.5 bg-[#F57E4F] rounded-full"></div> 광고비 <span className="text-[9px] text-gray-300">(천원)</span></div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-3 h-0 border-t-2 border-dashed border-[#298AD5]"></div> 유입량</div>
              </div>
            </div>
            <div className="h-[400px] w-full">
              {lineData.labels.length > 0 ? (
                <div key={selectedRange} className="w-full h-full animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
                  <LineChart data={lineData} height={400} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-300 text-xs font-bold">데이터가 부족합니다.</div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
            <h4 className="text-sm font-black text-gray-900 tracking-tight mb-8">플랫폼별 광고비 비중</h4>
            <div className="flex-1 flex flex-col xl:flex-row items-center justify-between gap-8 px-2">
              <div className="flex-1 flex justify-center">
                {donutData.length > 0 ? <DonutChart data={donutData} size={220} /> : <div className="text-gray-300 text-xs font-bold">비중 데이터 없음</div>}
              </div>
              <div className="flex flex-col gap-3 min-w-[120px]">
                {donutData.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-[5px]" style={{ backgroundColor: d.color }}></div>
                    <span className="text-[11px] font-black text-gray-500 whitespace-nowrap">
                      {d.label.replace('네이버 스마트플레이스', '네이버').replace('네이버 검색광고', '네이버').replace('인스타그램 인플루언서', '인스타그램').replace('토스 플레이스', '토스').replace('당근 광고', '당근')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-sm font-black text-gray-900 tracking-tight">광고 클릭율 지표 (CTR 추이)</h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <MetaIcon className="w-3 h-3 rounded-full" /> (CTR)
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <KarrotIcon className="w-3 h-3 rounded-full" /> (CTR)
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                  <NaverIcon className="w-3 h-3 rounded-full" /> (CTR)
                </div>
              </div>
            </div>
            <div className="h-[240px]">
              <LineChart data={ctrLineData} height={240} />
            </div>
          </div>
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
            <h4 className="text-sm font-black text-gray-900 tracking-tight mb-8">리뷰 및 전환 성과 (연간)</h4>
            <div className="h-[240px]">
              <StackedBarChart data={stackedReviewData} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[32px] p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-xl"><Sparkles className="w-4 h-4" /></div>
            <h4 className="text-lg font-bold">AI 인사이트 리포트</h4>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">현재 {currentMonth.split('-')[1]}월 광고 효율이 지난달 대비 12% 상승했습니다. 특히 인스타그램 인플루언서 캠페인이 매출 전환의 30%를 견인하고 있습니다.</p>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black tracking-widest uppercase transition-all border border-white/10">상세 분석 보고서 보기</button>
        </div>
      </div>
    );
  };

  const renderCalendar = (categoryKey) => {
    const category = UI_STRUCTURE[categoryKey];
    const [year, month] = currentMonth.split('-').map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

    return (
      <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden mt-10">
        <div className="p-8 border-b border-gray-100 bg-gray-50/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 p-2.5 rounded-xl"><CalendarDays className="w-6 h-6 text-white" /></div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{year}년 {month}월 데이터 현황</h2>
          </div>
        </div>
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
            <div key={d} className={`p-4 text-center text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-rose-500' : i === 6 ? 'text-blue-500' : 'text-gray-400'}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="h-40 border-r border-b border-gray-50 bg-gray-50/20"></div>;
            const ds = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isT = ds === formatDate(new Date());
            let cV = 0;
            category.columns.forEach(col => {
              const dd = monthlyData[col.id]?.[ds] || {};
              cV += dd[categoryKey === 'cost' ? 'cost' : col.fields[0].id] || 0;
            });

            return (
              <div key={ds} onClick={() => { setTargetDate(ds); setIsHistoryModalOpen(true); }} className={`h-40 p-4 border-r border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50/50 group relative bg-white`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-sm font-black ${isT ? 'w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center -translate-x-1 -translate-y-1' : 'text-gray-900'} ${idx % 7 === 0 ? 'text-rose-500' : idx % 7 === 6 ? 'text-blue-500' : ''}`}>{day}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTargetDate(ds);
                      setQuickCampaigns({}); // Reset staging data
                      setQuickNumeric({});   // Reset staging data
                      setDeletedCampaignIds([]);
                      setIsInputModalOpen(true);
                    }}
                    className="w-10 h-10 bg-gray-900 text-white rounded-[14px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:rotate-90 hover:bg-blue-600 active:scale-90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {categoryKey === 'cost' ? (
                  <div className="mt-2 flex flex-col gap-1.5 scrollbar-hide overflow-y-auto max-h-[80px]">
                    {(monthlyData.campaigns || []).filter(c => {
                      if (!c.period || !c.period.includes(' ~ ')) return false;
                      const [start, end] = c.period.split(' ~ ').map(s => s.replace(/\./g, '-'));
                      return ds === start; // Only show on start date
                    }).map((c, cIdx) => {
                      const platform = UI_STRUCTURE.cost.columns.find(col => col.id === c.platform);
                      return (
                        <div key={cIdx} className="flex flex-col gap-0.5 group/camp pr-1 mb-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {(() => {
                              // Start with default platform icon
                              let icon = platform?.icon;

                              // Override for Sponsorship details
                              if (c.platform === 'hyupchan') {
                                if (c.channelType === 'instagram') icon = <InstaIcon className="w-3 h-3 shrink-0" />;
                                else if (c.channelType === 'blog') icon = <BlogIcon className="w-3 h-3 shrink-0" />;
                              }

                              return icon ? (
                                React.cloneElement(icon, { className: "w-3 h-3 shrink-0" })
                              ) : (
                                <div className={`w-2 h-2 rounded-full shrink-0 ${platform?.color || 'bg-blue-500'}`}></div>
                              );
                            })()}
                            <span className="text-[10px] font-black text-gray-900 truncate">{c.title}</span>
                          </div>
                          <div className="flex items-center gap-2 pl-4">
                            <span className="text-[9px] font-bold text-blue-600">{(parseFloat(c.cost) || 0).toLocaleString()}원</span>
                            {c.ctr && <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1 rounded-sm">{c.ctr}%</span>}
                          </div>
                        </div>
                      );
                    })}

                    {/* Also show Daily Numeric Fields (like Daily CTR) in Cost Tab */}
                    {category.columns.map(col => {
                      const dd = monthlyData[col.id]?.[ds] || {};
                      const nonCostFields = col.fields.filter(f => f.id !== 'cost');
                      if (nonCostFields.length === 0) return null;

                      return nonCostFields.map(field => {
                        const val = dd[field.id];
                        if (!val) return null;
                        return (
                          <div key={field.id} className="flex items-center gap-1.5 pl-4 mt-1 border-l-2 border-gray-100">
                            <span className="text-[8px] font-bold text-gray-400">{field.label}</span>
                            <span className="text-[9px] font-black text-gray-900">{val}{field.id === 'ctr' ? '%' : ''}</span>
                          </div>
                        );
                      });
                    })}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col gap-1.5 scrollbar-hide overflow-y-auto max-h-[100px]">
                    {category.columns.map(col => {
                      const dd = monthlyData[col.id]?.[ds] || {};

                      // Custom Calendar Display for Real Sales
                      if (col.id === 'toss') {
                        const cafe = dd.cafe_revenue || 0;
                        const dinner = dd.dinner_revenue || 0;
                        const total = cafe + dinner;
                        if (total === 0) return null;

                        return (
                          <div key={col.id} className="flex flex-col gap-0.5 mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                {col.icon}
                              </div>
                              <span className="text-[10px] font-black text-gray-900">{total.toLocaleString()}</span>
                              <span className="text-[8px] font-bold text-gray-400">원</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-[22px]">
                              <div className="flex justify-between items-center w-full max-w-[100px]">
                                <span className="text-[8px] text-gray-400 font-bold">카페</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">{cafe.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center w-full max-w-[100px]">
                                <span className="text-[8px] text-gray-400 font-bold">디너</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">{dinner.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (col.id === 'smartplace' && categoryKey === 'inflow') {
                        const hq = parseFloat(dd.hq_exposure) || 0;
                        const dorim = parseFloat(dd.dorim_exposure) || 0;
                        const total = hq + dorim;
                        if (total === 0) return null;

                        return (
                          <div key={col.id} className="flex flex-col gap-0.5 mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                {col.icon}
                              </div>
                              <span className="text-[10px] font-black text-gray-900">{total.toLocaleString()}</span>
                              <span className="text-[8px] font-bold text-gray-400">회</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-[22px]">
                              <div className="flex justify-between items-center w-full max-w-[100px]">
                                <span className="text-[8px] text-gray-400 font-bold">작은따옴표</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">{hq.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center w-full max-w-[100px]">
                                <span className="text-[8px] text-gray-400 font-bold">도림 HQ</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">{dorim.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      if (col.id === 'catchtable' && categoryKey === 'inflow') {
                        // Metrics with legacy fallback
                        const resCount = parseFloat(dd.res_count) || parseFloat(dd.reservation) || 0;
                        const resPeople = parseFloat(dd.res_people) || 0;
                        const walkCount = parseFloat(dd.walk_count) || parseFloat(dd.walkin) || 0;
                        const walkPeople = parseFloat(dd.walk_people) || 0;

                        const totalCount = resCount + walkCount;
                        const totalPeople = resPeople + walkPeople;

                        if (totalCount === 0 && totalPeople === 0) return null;

                        return (
                          <div key={col.id} className="flex flex-col gap-0.5 mb-1.5">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                {col.icon}
                              </div>
                              <span className="text-[10px] font-black text-gray-900">{totalCount.toLocaleString()}</span>
                              <span className="text-[8px] font-bold text-gray-400">건</span>
                              <span className="text-[8px] text-gray-300">/</span>
                              <span className="text-[10px] font-black text-gray-900">{totalPeople.toLocaleString()}</span>
                              <span className="text-[8px] font-bold text-gray-400">명</span>
                            </div>
                            <div className="flex flex-col gap-0.5 pl-[22px]">
                              <div className="flex justify-between items-center w-full max-w-[120px]">
                                <span className="text-[8px] text-gray-400 font-bold">예약 고객</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">
                                  {resCount}<span className="text-[7px] font-normal text-gray-400 ml-0.5">건</span> / {resPeople}<span className="text-[7px] font-normal text-gray-400 ml-0.5">명</span>
                                </span>
                              </div>
                              <div className="flex justify-between items-center w-full max-w-[120px]">
                                <span className="text-[8px] text-gray-400 font-bold">워크인 고객</span>
                                <span className="text-[8px] text-gray-500 font-bold tracking-tight">
                                  {walkCount}<span className="text-[7px] font-normal text-gray-400 ml-0.5">건</span> / {walkPeople}<span className="text-[7px] font-normal text-gray-400 ml-0.5">명</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // Determine primary field for display based on category
                      let field = col.fields[0];
                      if (col.id === 'smartplace' && categoryKey === 'inflow') field = col.fields[1]; // Fallback for other Smart Place metrics if any

                      const val = dd[field.id];
                      if (val === undefined || val === null || val === 0) return null;

                      return (
                        <div key={col.id} className="flex items-center gap-1.5 min-w-0">
                          <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                            {col.icon ? (
                              React.cloneElement(col.icon, { className: "w-full h-full object-contain" })
                            ) : (
                              <div className={`w-2.5 h-2.5 rounded-full ${col.color || 'bg-gray-400'}`}></div>
                            )}
                          </div>
                          <div className="flex baseline gap-1 min-w-0">
                            <span className="text-[10px] font-black text-gray-900">{val.toLocaleString()}</span>
                            <span className="text-[8px] font-bold text-gray-400 truncate">
                              {field.type === 'cost' ? '원' : field.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {/* Fallback for empty day */}
                    {category.columns.every(col => {
                      const dd = monthlyData[col.id]?.[ds] || {};
                      if (col.id === 'smartplace' && categoryKey === 'inflow') {
                        return !(dd.hq_exposure || dd.dorim_exposure);
                      }
                      let field = col.fields[0];
                      if (col.id === 'smartplace' && categoryKey === 'inflow') field = col.fields[1];
                      return !dd[field.id];
                    }) && (
                        <div className="mt-1 text-[10px] text-gray-200 font-bold tracking-tighter flex items-center gap-1 opacity-0 group-hover:opacity-100 animate-pulse">
                          <FileText className="w-3 h-3" /> 기록 대기 중
                        </div>
                      )}
                  </div>
                )}
                {ds === targetDate && (isInputModalOpen || isHistoryModalOpen) && (
                  <div className="absolute inset-0 border-[3px] border-blue-500 rounded-none pointer-events-none z-20"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Monthly Sales Trend Chart (Only for Sales) */}
        {categoryKey === 'sales' && (() => {
          // 1. Prepare Daily Data for the current month
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
          const labels = days.map(d => `${d}일`);

          const chartData = {
            labels,
            datasets: [
              {
                label: '실매출 총액',
                data: days.map(d => {
                  const ds = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const dd = monthlyData.toss?.[ds] || {};
                  return (dd.cafe_revenue || 0) + (dd.dinner_revenue || 0);
                }),
                borderColor: '#10b981', // Emerald 500
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                tension: 0.3,
                fill: true
              },
              {
                label: '카페 매출',
                data: days.map(d => {
                  const ds = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const dd = monthlyData.toss?.[ds] || {};
                  return dd.cafe_revenue || 0;
                }),
                borderColor: '#f97316', // Orange 500
                borderDash: [5, 5],
                tension: 0.3
              },
              {
                label: '디너 매출',
                data: days.map(d => {
                  const ds = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const dd = monthlyData.toss?.[ds] || {};
                  return dd.dinner_revenue || 0;
                }),
                borderColor: '#6366f1', // Indigo 500
                borderDash: [5, 5],
                tension: 0.3
              }
            ]
          };

          const totalMonthly = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

          return (
            <div className="p-8 border-t border-gray-100 bg-white">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <div className="bg-emerald-100 p-1.5 rounded-lg"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                    {year}년 {month}월 실매출 일별 추이
                  </h4>
                  <p className="text-xs text-gray-400 font-bold mt-1 ml-9">이번 달 총 매출: <span className="text-gray-900">{totalMonthly.toLocaleString()}원</span></p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-3 h-1 bg-emerald-500 rounded-full"></div> 실매출</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-3 h-1 border-t-2 border-dashed border-orange-500"></div> 카페</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400"><div className="w-3 h-1 border-t-2 border-dashed border-indigo-500"></div> 디너</div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <LineChart data={chartData} height={300} />
              </div>
            </div>
          );
        })()}
      </div>
    );
  };

  const renderSummaryCards = (categoryKey) => {
    const category = UI_STRUCTURE[categoryKey];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {category.columns.map(col => {
          // Calculate values for all fields in this column/platform
          const platformMetrics = col.fields.map(f => {
            let sum = 0;
            Object.values(monthlyData[col.id] || {}).forEach(day => { sum += day[f.id] || 0; });
            return { label: f.label, value: sum, unit: f.type === 'cost' ? '원' : '건/명' };
          });

          return (
            <div key={col.id} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-2">
                  {col.icon}
                  <span className="text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase">{col.label}</span>
                </div>
              </div>

              {col.id === 'toss' ? (
                // Custom Hierarchical Display for Real Sales
                (() => {
                  const cafeMetric = platformMetrics.find(m => m.label === '카페 매출') || { value: 0 };
                  const dinnerMetric = platformMetrics.find(m => m.label === '디너 매출') || { value: 0 };
                  const totalValue = cafeMetric.value + dinnerMetric.value;

                  return (
                    <div className="space-y-6">
                      {/* Main Parent: Real Sales Total */}
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 실매출 총액
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-gray-900 tracking-tighter">{totalValue.toLocaleString()}</span>
                          <span className="text-xs font-black text-gray-400">원</span>
                        </div>
                      </div>

                      {/* Children: Breakdown */}
                      <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">카페 매출</span>
                          <span className="text-sm font-black text-gray-700">{cafeMetric.value.toLocaleString()} <small className="text-[9px] text-gray-300">원</small></span>
                        </div>
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">디너 매출</span>
                          <span className="text-sm font-black text-gray-700">{dinnerMetric.value.toLocaleString()} <small className="text-[9px] text-gray-300">원</small></span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : col.id === 'hyupchan' ? (
                // Custom Breakdown for Sponsorship Ads
                (() => {
                  let total = 0;
                  let insta = 0;
                  let blog = 0;
                  let other = 0;

                  (monthlyData.campaigns || []).forEach(c => {
                    if (c.platform !== 'hyupchan') return;
                    const cost = parseFloat(c.cost) || 0;
                    total += cost;
                    if (c.channelType === 'instagram') insta += cost;
                    else if (c.channelType === 'blog') blog += cost;
                    else other += cost;
                  });

                  return (
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 mb-1 flex items-center gap-1">협찬광고 총액</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-gray-900 tracking-tighter">{total.toLocaleString()}</span>
                          <span className="text-[10px] font-black text-gray-400">원</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pl-3 border-l-2 border-gray-100 py-1">
                        {/* Instagram Breakdown */}
                        <div className="flex justify-between items-center group/sub">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 group-hover/sub:text-pink-500 transition-colors">
                            <div className="bg-gray-100 rounded-full p-0.5 group-hover/sub:bg-pink-100 transition-colors">
                              <InstaIcon className="w-2.5 h-2.5 grayscale group-hover/sub:grayscale-0 transition-all opacity-50 group-hover/sub:opacity-100" />
                            </div>
                            <span>인스타</span>
                          </div>
                          <span className="text-xs font-black text-gray-700">{insta.toLocaleString()} <span className="text-[9px] text-gray-300 font-normal">원</span></span>
                        </div>

                        {/* Blog Breakdown */}
                        <div className="flex justify-between items-center group/sub">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 group-hover/sub:text-[#03C75A] transition-colors">
                            <div className="bg-gray-100 rounded-full p-0.5 group-hover/sub:bg-green-100 transition-colors">
                              <BlogIcon className="w-2.5 h-2.5 grayscale group-hover/sub:grayscale-0 transition-all opacity-50 group-hover/sub:opacity-100" />
                            </div>
                            <span>블로그</span>
                          </div>
                          <span className="text-xs font-black text-gray-700">{blog.toLocaleString()} <span className="text-[9px] text-gray-300 font-normal">원</span></span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (col.id === 'smartplace' && categoryKey === 'inflow') ? (
                // Custom Breakdown for Smart Place (Dual Location) - ONLY FOR INFLOW TAB
                (() => {
                  let hqTotal = 0;
                  let dorimTotal = 0;
                  Object.values(monthlyData[col.id] || {}).forEach(day => {
                    hqTotal += parseFloat(day.hq_exposure) || 0;
                    dorimTotal += parseFloat(day.dorim_exposure) || 0;
                  });
                  const total = hqTotal + dorimTotal;

                  return (
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 총 유입수 (통합)
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-gray-900 tracking-tighter">{total.toLocaleString()}</span>
                          <span className="text-xs font-black text-gray-400">회</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">작은따옴표</span>
                          <span className="text-sm font-black text-gray-700">{hqTotal.toLocaleString()} <small className="text-[9px] text-gray-300">회</small></span>
                        </div>
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">도림천점(HQ)</span>
                          <span className="text-sm font-black text-gray-700">{dorimTotal.toLocaleString()} <small className="text-[9px] text-gray-300">회</small></span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : ((col.id === 'smartplace' || col.id === 'meta') && categoryKey === 'cost') ? (
                // Custom Breakdown for Ad Platforms (Cost Tab) - Naver & Meta
                (() => {
                  // Total Spend (Campaigns)
                  let totalSpend = 0;
                  (monthlyData.campaigns || []).forEach(c => {
                    if (c.platform === col.id) totalSpend += parseFloat(c.cost) || 0;
                  });

                  // Average CTR (Only from Campaigns, ignoring legacy Daily data)
                  const campaignCTRValues = (monthlyData.campaigns || [])
                    .filter(c => c.platform === col.id && c.ctr)
                    .map(c => parseFloat(c.ctr) || 0);

                  // const dailyCTRValues = ... (Removed to fix ghost cache issue)

                  const allCTRValues = [...campaignCTRValues];
                  const avgCTR = allCTRValues.length > 0
                    ? allCTRValues.reduce((sum, v) => sum + v, 0) / allCTRValues.length
                    : 0; // Default to 0 if no campaign CTR

                  return (
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 mb-1 flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${col.id === 'smartplace' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span> 광고비 총액
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-gray-900 tracking-tighter">{totalSpend.toLocaleString()}</span>
                          <span className="text-xs font-black text-gray-400">원</span>
                        </div>
                      </div>

                      {/* Always show if platform is SmartPlace or Meta, even if 0 */}
                      <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">평균 클릭율(CTR)</span>
                          {avgCTR >= 0.01 ? (
                            <div className="flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                              <span className="text-sm font-black text-rose-600">{avgCTR.toFixed(2)} <small className="text-[9px] text-rose-400">%</small></span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                              <span className="text-sm font-black text-gray-500">{avgCTR.toFixed(2)} <small className="text-[9px] text-gray-400">%</small></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (col.id === 'catchtable' && categoryKey === 'inflow') ? (
                // Custom Breakdown for Catchtable (Total Visitors) - Inflow Tab
                (() => {
                  let resCount = 0;
                  let resPeople = 0;
                  let walkCount = 0;
                  let walkPeople = 0;

                  Object.values(monthlyData[col.id] || {}).forEach(day => {
                    // Accumulate new fields
                    resCount += parseFloat(day.res_count) || 0;
                    resPeople += parseFloat(day.res_people) || 0;
                    walkCount += parseFloat(day.walk_count) || 0;
                    walkPeople += parseFloat(day.walk_people) || 0;

                    // Fallback for legacy data (if any)
                    if (day.reservation) resCount += parseFloat(day.reservation) || 0; // Assume legacy 'reservation' maps to count
                    if (day.walkin) walkCount += parseFloat(day.walkin) || 0; // Assume legacy 'walkin' maps to count
                  });

                  const totalCount = resCount + walkCount;
                  const totalPeople = resPeople + walkPeople;

                  const resRatio = totalCount > 0 ? Math.round((resCount / totalCount) * 100) : 0;
                  const walkRatio = totalCount > 0 ? Math.round((walkCount / totalCount) * 100) : 0;

                  return (
                    <div className="space-y-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 mb-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 총 방문고객
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-black text-gray-900 tracking-tighter">{totalCount.toLocaleString()}</span>
                          <span className="text-xs font-black text-gray-400">건</span>
                          <span className="text-gray-300 mx-1">/</span>
                          <span className="text-3xl font-black text-gray-900 tracking-tighter">{totalPeople.toLocaleString()}</span>
                          <span className="text-xs font-black text-gray-400">명</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">예약 고객</span>
                          <span className="text-sm font-black text-gray-700 flex items-center gap-1.5">
                            {resCount.toLocaleString()}<small className="text-[9px] text-gray-300">건</small>
                            <span className="text-[9px] font-bold text-orange-500 bg-orange-50 px-1 py-0.5 rounded">({resRatio}%)</span>
                            <span className="text-gray-300 mx-1">/</span>
                            {resPeople.toLocaleString()}<small className="text-[9px] text-gray-300">명</small>
                          </span>
                        </div>
                        <div className="flex justify-between items-center group/sub">
                          <span className="text-[10px] font-bold text-gray-400 group-hover/sub:text-gray-600 transition-colors">워크인 고객</span>
                          <span className="text-sm font-black text-gray-700 flex items-center gap-1.5">
                            {walkCount.toLocaleString()}<small className="text-[9px] text-gray-300">건</small>
                            <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1 py-0.5 rounded">({walkRatio}%)</span>
                            <span className="text-gray-300 mx-1">/</span>
                            {walkPeople.toLocaleString()}<small className="text-[9px] text-gray-300">명</small>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="space-y-5">
                  {platformMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 mb-1">{m.label}</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">{m.value.toLocaleString()}</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
        }
      </div >
    );
  };

  const renderCampaignList = () => {
    const campaigns = monthlyData.campaigns || [];
    if (campaigns.length === 0) return null;

    return (
      <div className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white"><FileText className="w-5 h-5" /></div>
            <h3 className="text-lg font-black text-gray-900">전체 캠페인 현황</h3>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> 진행중
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div> 종료됨
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c, idx) => {
            const platform = UI_STRUCTURE.cost.columns.find(p => p.id === c.platform);
            return (
              <div key={idx} className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
                <div className={`absolute top-0 right-0 w-1.5 h-full ${c.active ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {platform?.icon}
                    {platform?.id === 'hyupchan' && c.channelType === 'instagram' && <div className="bg-white rounded-full p-0.5 shadow-sm"><InstaIcon className="w-3.5 h-3.5" /></div>}
                    {platform?.id === 'hyupchan' && c.channelType === 'blog' && <div className="bg-white rounded-full p-0.5 shadow-sm"><BlogIcon className="w-3.5 h-3.5" /></div>}
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                      {platform?.id === 'hyupchan' && c.channelType === 'instagram' ? '인스타그램 협찬' :
                        platform?.id === 'hyupchan' && c.channelType === 'blog' ? '블로그 협찬' :
                          platform?.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => deleteCampaign(c.id || c.campaignId || c.title)}
                      className="p-2 hover:bg-rose-50 text-gray-300 hover:text-rose-500 rounded-xl transition-all"
                      title="캠페인 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${c.active ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'}`}>
                      {c.active ? 'ON ACTIVE' : 'FINISHED'}
                    </span>
                  </div>
                </div>
                {(c.platform === 'influencer' || (c.platform === 'hyupchan' && c.channelType === 'instagram')) && c.title.startsWith('@') ? (
                  <a
                    href={`https://www.instagram.com/${c.title.substring(1)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-black text-gray-900 mb-1 hover:text-blue-600 hover:underline transition-all block w-fit"
                  >
                    {c.title}
                    <span className="inline-block ml-1 text-gray-400 opacity-50"><ExternalLink className="w-3 h-3" /></span>
                  </a>
                ) : (c.platform === 'hyupchan' && c.channelType === 'blog') ? (
                  <a
                    href={`https://blog.naver.com/${c.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-black text-gray-900 mb-1 hover:text-[#03C75A] hover:underline transition-all block w-fit"
                  >
                    {c.title}
                    <span className="inline-block ml-1 text-gray-400 opacity-50"><ExternalLink className="w-3 h-3" /></span>
                  </a>
                ) : (
                  <h4 className="text-sm font-black text-gray-900 mb-1">{c.title}</h4>
                )}
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-blue-500 font-bold font-mono">{c.period}</span>
                  <span className="text-lg font-black text-gray-900">{(parseFloat(c.cost) || 0).toLocaleString()}<small className="text-[10px] font-bold text-gray-400 ml-0.5">원</small></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f2f4f6]/40 min-h-screen pb-32 font-sans selection:bg-blue-100 text-gray-900">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Main Header / GNB */}
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg shadow-teal-500/20 border-2 border-white">
              <img src="/profile.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-gray-900">
              작은따옴표 <span className="text-gray-400 font-bold ml-1">마케팅 대시보드</span>
            </h1>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Main Manager</span>
              {isEditingManager ? (
                <input 
                  autoFocus
                  type="text" 
                  value={mainManager} 
                  onChange={(e) => setMainManager(e.target.value)}
                  onBlur={() => { setIsEditingManager(false); saveSettings(mainManager, leadDeveloper); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditingManager(false); saveSettings(mainManager, leadDeveloper); } }}
                  className="text-xs font-black text-gray-900 bg-gray-100 rounded px-2 py-0.5 w-20 text-right outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div onClick={() => setIsEditingManager(true)} className="flex items-center gap-1 cursor-pointer group" title="클릭하여 수정">
                  <span className="text-xs font-black text-gray-900 group-hover:text-blue-500 transition-colors">{mainManager}</span>
                  <Edit2 className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              )}
            </div>
            <div className="flex flex-col items-end border-l border-gray-100 pl-8">
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-0.5">Lead Developer</span>
              {isEditingDeveloper ? (
                <input 
                  autoFocus
                  type="text" 
                  value={leadDeveloper} 
                  onChange={(e) => setLeadDeveloper(e.target.value)}
                  onBlur={() => { setIsEditingDeveloper(false); saveSettings(mainManager, leadDeveloper); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditingDeveloper(false); saveSettings(mainManager, leadDeveloper); } }}
                  className="text-xs font-black text-gray-900 bg-gray-100 rounded px-2 py-0.5 w-20 text-right outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div onClick={() => setIsEditingDeveloper(true)} className="flex items-center gap-1 cursor-pointer group" title="클릭하여 수정">
                  <span className="text-xs font-black text-gray-900 group-hover:text-blue-500 transition-colors">{leadDeveloper}</span>
                  <Edit2 className="w-3 h-3 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </div>
              )}
            </div>
          </div>
        </div>

        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-14">
          <div className="flex items-center gap-1 bg-white p-1.5 rounded-[32px] shadow-xl shadow-blue-900/5 border border-gray-100/50 backdrop-blur">
            {[
              { id: 'dashboard', label: '종합분석', icon: <img src="/dashboard_icon.png" alt="Dashboard" className="w-6 h-6 object-contain" /> },
              { id: 'sales', label: '매출데이터', icon: <img src="/icon_rev.png" alt="Revenue" className="w-5 h-5 object-contain" /> },
              { id: 'cost', label: '광고비', icon: <img src="/icon_ad.png" alt="Ad" className="w-5 h-5 object-contain" /> },
              { id: 'inflow', label: '유입 지표', icon: <img src="/icon_users.png" alt="Inflow" className="w-5 h-5 object-contain" /> },
              { id: 'review', label: '리뷰관리', icon: <img src="/icon_star.png" alt="Review" className="w-5 h-5 object-contain" /> }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-3 rounded-[28px] text-sm font-black whitespace-nowrap transition-all duration-500 ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-2xl scale-[1.05]' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}>{tab.icon}{tab.label}</button>
            ))}
          </div>

          {/* URL Launcher Button */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-[24px] border border-gray-100 shadow-sm">
            <button
              onClick={handleOpenUrls}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-[20px] transition-all active:scale-95 shadow-lg shadow-gray-900/10"
            >
              <span className="text-sm font-black whitespace-nowrap">데이터 보드 열기</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowUrlModal(true)}
              className="p-3.5 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-full transition-all"
              title="URL 설정"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-5 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100">
            <button onClick={() => changeMonth(-1)} className="p-2.5 hover:bg-gray-100 rounded-xl transition-all hover:scale-110 active:scale-90"><ChevronLeft className="w-6 h-6" /></button>
            <div className="flex flex-col items-center justify-center w-40">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Calendar Data</span>
              <div className="text-xl font-black tracking-tighter">{currentMonth.split('-')[0]}년 {currentMonth.split('-')[1]}월</div>
            </div>
            <button onClick={() => changeMonth(1)} className="p-2.5 hover:bg-gray-100 rounded-2xl transition-all hover:scale-110 active:scale-90"><ChevronRight className="w-6 h-6" /></button>
          </div>
        </header>

        <main className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[600px]"><div className="w-14 h-14 border-[6px] border-gray-100 border-t-gray-900 rounded-full animate-spin mb-8 shadow-inner"></div><p className="text-gray-400 font-black tracking-widest text-xs uppercase">Connecting to Database...</p></div>
          ) : (
            <>
              {activeTab === 'dashboard' ? renderDashboard() : (
                <>
                  {renderSummaryCards(activeTab)}
                  {renderCalendar(activeTab)}
                  {activeTab === 'cost' && renderCampaignList()}
                </>
              )}
            </>
          )}
        </main>

        {renderInputModal()}
        {renderHistoryModal()}
        {renderUrlModal()}

      </div>
    </div>
  );

  function changeMonth(delta) {
    let [y, m] = currentMonth.split('-').map(Number);
    m += delta;
    if (m === 0) { m = 12; y--; } else if (m === 13) { m = 1; y++; }
    setCurrentMonth(`${y}-${String(m).padStart(2, '0')}`);
  }
}


function KpiCard({ title, value, unit, icon, trend, children }) {
  const isTrendValid = trend !== null && trend !== undefined && !isNaN(trend);
  const isUp = isTrendValid && trend > 0;
  const isDown = isTrendValid && trend < 0;
  const isZero = isTrendValid && trend === 0;

  let trendColor = 'bg-gray-50 text-gray-400';
  if (isUp) trendColor = 'bg-emerald-50 text-emerald-600';
  if (isDown) trendColor = 'bg-rose-50 text-rose-600';

  return (
    <div className="bg-white py-5.5 px-7 rounded-[20px] border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/5 group relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="group-hover:scale-110 transition-transform duration-500">
          {React.cloneElement(icon, { className: "w-9 h-9 object-contain" })}
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${trendColor}`}>
          {isTrendValid ? (
            isZero ? (
              <span className="text-[10px] font-black px-1">0%</span>
            ) : (
              <div className="flex items-center text-[10px] font-black gap-1">
                {isUp && '+'}{isDown && '-'}{Math.abs(trend).toFixed(1)}%
              </div>
            )
          ) : (
            <span className="text-[10px] font-black px-1">-</span>
          )}
        </div>
      </div>
      <div>
        <p className="text-gray-400 font-bold text-[10px] mb-2 uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">{typeof value === 'number' ? value.toLocaleString() : value}<span className="text-sm text-gray-400 font-bold ml-1.5">{unit}</span></h3>
      </div>
      {children}
    </div>
  );
}

function LoadingSpinner() {
  return <div className="flex flex-col items-center justify-center h-[500px]"><div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div><p className="mt-4 text-gray-400 font-bold">데이터를 불러오는 중입니다...</p></div>;
}
