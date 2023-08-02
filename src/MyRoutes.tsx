import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Loading from './components/common/Loading';

const Login = lazy(() => import('./pages/Login'));
const LinkPage = lazy(() => import('./pages/Link'));
const Record = lazy(() => import('./pages/Record'));
const RecordInterview = lazy(() => import('./pages/RecordInterview'));
const RecordTreatment = lazy(() => import('./pages/RecordTreatment'));
const RecordEdit = lazy(() => import('./pages/RecordEdit'));
const RecordDetail = lazy(() => import('./pages/RecordDetail'));

const MyRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/media" element={<LinkPage />} />
          <Route path="/employee" element={<div>직원 관리</div>} />
          <Route path="/ticket" element={<div>ticket</div>} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/interview" element={<RecordInterview />} />
          <Route path="/record/treatment" element={<RecordTreatment />} />
          <Route path="/record/edit" element={<RecordEdit />} />
          <Route path="/record/detail/:id" element={<RecordDetail />} />
          <Route path="/media" element={<div>media</div>} />
          <Route path="/manage" element={<div>manage</div>} />
          <Route path="/alert" element={<div>alert</div>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
