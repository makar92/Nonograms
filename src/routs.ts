import { FC } from "react"
import { ADMIN_PANEL_ROUTE, CREATOR_NONOGRAM_ROUTE, NONOGRAMS_ROUTE, PAGE_NONOGRAM_ROUTE } from "./utils/constRouts"

import CreatorNonogram from "./components/Pages/СreatorNonogram/СreatorNonogram"
import Nonograms from "./components/Pages/Nonograms/Nonograms"
import AdminPanel from "./components/Pages/AdminPanel/AdminPanel"
import PageNonogram from "./components/Pages/PageNonogram/PageNonogram"


interface routes {
  path: string,
  Component: FC,
}

export const adminRoutes: Array<routes> = [
  { path: ADMIN_PANEL_ROUTE, Component: AdminPanel },
  { path: CREATOR_NONOGRAM_ROUTE, Component: CreatorNonogram },
  { path: NONOGRAMS_ROUTE, Component: Nonograms },
  { path: PAGE_NONOGRAM_ROUTE, Component: PageNonogram },
]

export const publicRoutes: Array<routes> = [
  { path: NONOGRAMS_ROUTE, Component: Nonograms },
  { path: PAGE_NONOGRAM_ROUTE, Component: PageNonogram },
]

