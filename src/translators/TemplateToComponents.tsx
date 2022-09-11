import { Fragment, lazy, Suspense } from "react";
// import { basicCanvas1 } from "../templates/canvas-templates";

export interface props {
  template: UIchild[];
}

// interface PropThing {

// }

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
      const TheComponent = lazy(
        () =>
          import(
            `../components/main-ui/editor-gui-components/${mainChild.tagName}`
          )
      );
      const props = mainChild.props || [];

      return mainChild.tagName === "Fragment" ? (
        <Suspense fallback={null}>
          <Fragment key={mainChild.id}>
            {renderChildren(mainChild.children)}
          </Fragment>
        </Suspense>
      ) : (
        <Suspense fallback={null}>
          <TheComponent key={mainChild.id} {...props}>
            {renderChildren(mainChild.children)}
          </TheComponent>
        </Suspense>
      );
    });
  };

  // const TheComponent4 = "box" as any;

  return <>{renderChildren(template)}</>;
};
