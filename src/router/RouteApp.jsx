import { Route, Routes } from "react-router-dom";
import Layout from "../layouts";
import { publicRoute } from "./SiteRoute";
import { NoPage } from "../pages";
import { privateRouter } from "./privateRouter";
import { useEffect, useState } from "react";
import { checkRole } from "../helpers/utils";
import { adminRouter } from "./adminRouter";

const RouteApp = () => {
  const [role, setRole] = useState("USER");
  useEffect(() => {
    if (checkRole("ADMIN")) {
      setRole("ADMIN");
    } else if (checkRole("SHOP")) {
      setRole("SHOP");
    }
  }, []);
  return (
    <>
      <Routes>
        {publicRoute.map((route, index) => {
          const {
            path,
            component: Component,
            layout: LayoutSite = Layout,
          } = route;
          if (LayoutSite == null)
            return <Route key={index} path={path} element={<Component />} />;
          return (
            <Route
              key={index}
              path={path}
              element={
                <LayoutSite>
                  <Component />
                </LayoutSite>
              }
            />
          );
        })}
        {privateRouter.map((route, index) => {
          const { path, component: Component, layout: Layout } = route;
          if (route.layout) {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              ></Route>
            );
          }
          return (
            <Route key={index} path={path} element={<Component />}></Route>
          );
        })}
        {adminRouter.map((route, index) => {
          const { path, component: Component, layout: Layout } = route;
          if (route.layout) {
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              ></Route>
            );
          }
          return (
            <Route key={index} path={path} element={<Component />}></Route>
          );
        })}

        <Route path="*" element={<NoPage />}></Route>
      </Routes>
    </>
  );
};

export default RouteApp;
