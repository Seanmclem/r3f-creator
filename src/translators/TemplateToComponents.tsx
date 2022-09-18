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

// const MyBox2 = lazy(
//   () => import("../components/main-ui/editor-gui-components/TestBox2")
// );

const myComponents: Record<string, any> = {};
myComponents.TestBox2 = lazy(
  () => import("../components/main-ui/editor-gui-components/TestBox2")
);
myComponents.TestBox = lazy(
  () => import("../components/main-ui/editor-gui-components/TestBox")
);

export const TemplateToComponents: React.FC<props> = ({ template }) => {
  const renderChildren: any = (children: UIchild[]) => {
    if (!children?.length) {
      return null;
    }
    return children.map((mainChild) => {
      let TheComponent: any;
      const componentPath = `components/main-ui/editor-gui-components/${mainChild.tagName}`;
      const existingComponent = myComponents[componentPath] as any;
      TheComponent = myComponents[mainChild.tagName];

      // if (existingComponent) {
      //   console.log("EXISTING");
      //   // return ;
      //   TheComponent = existingComponent;
      // } else {
      // }

      // TheComponent = lazy(async () => {
      //   // console.log({
      //   //   componentPath,
      //   //   existingComponent,
      //   //   myComponents,
      //   // });

      //   // myComponents[componentPath] = await import(`../${componentPath}`);
      //   // return myComponents[componentPath];

      //   return myComponents.TestBox2

      //   // return existingComponent || import(`../${componentPath}`);
      // });
      // maybe drop this into an object, key is the full path, and re-use if found? to speed up change, or suppress flickering
      // only get it Lazily if not gotten before
      // Basic test shows, that should work to prevent flicker

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
