import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Nav from './components/header';
import Loading from './components/common/Loading';
import Logintest from './components/link/logintest';

const LinkPage = lazy(() => import('./pages/Link'));
const Record = lazy(() => import('./pages/Record'));

const MyRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/media" element={<LinkPage />} />
          <Route path="/employee" element={<Logintest />} />
          <Route path="/ticket" element={<div>ticket</div>} />
          <Route path="/record" element={<Record />} />
          <Route
            path="/record/create"
            element={<div>생성 페이지입니다.</div>}
          />
          <Route
            path="/record/edit/:id"
            element={<div>수정 페이지입니다.</div>}
          />
          <Route
            path="/record/detail/:id"
            element={<div>상세보기 페이지입니다.</div>}
          />
          <Route path="/media" element={<div>media</div>} />
          <Route path="/manage" element={<div>manage</div>} />
          <Route path="/alert" element={<div>alert</div>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MyRouter;
