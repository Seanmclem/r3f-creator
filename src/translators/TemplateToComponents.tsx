interface props {
  template: any;
}

export const TemplateToComponents: React.FC<{}> = () => {
  const renderChildren = (children: any[]) => {
    // call renderChildren() on children of children, in this function
  };

  //render as text first

  return <>{/* renderChildren() */}</>;
};
