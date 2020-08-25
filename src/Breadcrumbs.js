import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props;

  const pathnames = pathname.split("/").filter(x => x);

  return (
    <div style={{paddingBottom:'24px'}}>
      <Typography style={{ float: 'left',fontWeight:'500',fontSize:'1.6rem',marginTop:'-9px',color:'#464d69' }}>
        {pathnames.length > 0 ? pathnames[pathnames.length-1]:'Courses'}
      </Typography>
      <MUIBreadcrumbs aria-label="breadcrumb" style={{ float:'right' }}>
        {pathnames.length > 0 ? pathnames[0]!=="Courses"?(
          <Link onClick={() => history.push("/")} style={{cursor:'pointer',textDecoration:'none',color:'#007791'}}>Course</Link>
        ):'' : (
            <Typography> Course </Typography>
          )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{name}</Typography>
          ) : (
              <Link key={name} onClick={() => {routeTo==="/Courses"?history.push("/"):history.push(routeTo)}} style={{cursor:'pointer',textDecoration:'none',color:'#007791'}}>
                {name}
              </Link>
            );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);
