import React from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import classes from '@/pages/special-project/SpecialProject.module.scss';
import Q_SpecialProjectGradient from '@/components/quarks/Q_SpecialProjectGradient/Q_SpecialProjectGradient';

const SpecialProject = () => {
  return (
    <div className={classes.page}>
      <Q_SpecialProjectGradient />
      <W_SectionElementsWrapper className={classes.content}>
        <div className={classes.breakdiv}></div>
        <h1>test</h1>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default SpecialProject;
