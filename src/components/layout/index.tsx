import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import classes from './index.module.scss';

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={classes.AppShellGrid}>
      {/* <div className={classes.SidebarWrapper}> */}
      <Sidebar />
      {/* </div> */}
      <div className={classes.MainWrapper}>
        <Navbar />
        <main className={classes.BoardContentWrapper}>{children}</main>
      </div>
    </div>
  );
};
