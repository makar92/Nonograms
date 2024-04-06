import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { adminRoutes, publicRoutes } from '../../../../routs'
import { ADMIN_PANEL_ROUTE, NONOGRAMS_ROUTE } from '../../../../utils/constRouts'
import { useTypedSelector } from '../../../../hooks/useTepedSelector'

const AppRouter = () => {

  const isAdmin = useTypedSelector((state) => state.isAdminReducer.isAdmin)

  return (
    isAdmin
      ? <Routes>
        {adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path='*' element={<Navigate to={ADMIN_PANEL_ROUTE} replace />} />
      </Routes>
      : <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path='*' element={<Navigate to={NONOGRAMS_ROUTE} replace />} />
      </Routes>
  )
}

export default AppRouter