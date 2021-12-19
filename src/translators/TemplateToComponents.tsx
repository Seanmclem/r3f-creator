import { Fragment } from "react";
// import { basicCanvas1 } from "../templates/canvas-templates";

export interface props {
  template: UIchild[];
}

export interface UIchild {
  id: string;
  tagName: string;
  props?: any;
  children: UIchild[];
}

export const TemplateToComponents: React.FC<props> = ({ template }) => {
  const renderChildren: any = (children: UIchild[]) => {
    if (!children?.length) {
      return null;
    }
    return children.map((mainChild) => {
      const TheComponent = mainChild.tagName as any;
      const props = mainChild.props || [];

      return mainChild.tagName === "Fragment" ? (
        <Fragment key={mainChild.id}>
          {renderChildren(mainChild.children)}
        </Fragment>
      ) : (
        <TheComponent key={mainChild.id} {...props}>
          {renderChildren(mainChild.children)}
        </TheComponent>
      );
    });
  };

  // const TheComponent4 = "box" as any;

  return <>{renderChildren(template)}</>;
};
