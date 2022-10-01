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
//   () => import("../components/main-ui/editor-gui-components/GenericBox")
// );

const td2 = "GenericBox";

const registered_Components: Record<string, any> = {};
registered_Components.GenericBox = lazy(
  () => import(`../components/main-ui/editor-gui-components/${td2}`)
);
registered_Components.TestBox = lazy(
  () => import(`../components/main-ui/editor-gui-components/${"TestBox"}`)
);
/** IDEA */
/** Can have a script, on project start, that puts the list of tagNames into an object to loop over? */
/** Later. v */
/** or something better. Can also just do it syncronisly when new components are added? before the view is updated. Maye with useState? */

/** EDITOR RENDERING */
export const TemplateToComponents: React.FC<props> = ({ template }) => {
  const renderChildren: any = (children: UIchild[]) => {
    if (!children?.length) {
      return null;
    }
    return children.map((mainChild, idx) => {
      // let TheComponent: any;
      // const componentPath = `components/main-ui/editor-gui-components/${mainChild.tagName}`;
      // const existingComponent = myComponents[componentPath] as any;
      const TheComponent = registered_Components[mainChild.tagName];

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

      //   return myComponents.GenericBox

      //   // return existingComponent || import(`../${componentPath}`);
      // });
      // maybe drop this into an object, key is the full path, and re-use if found? to speed up change, or suppress flickering
      // only get it Lazily if not gotten before
      // Basic test shows, that should work to prevent flicker

      const props = mainChild.props || [];

      return mainChild.tagName === "Fragment" ? (
        <Suspense fallback={null} key={mainChild.id}>
          <Fragment key={mainChild.id}>
            {renderChildren(mainChild.children)}
          </Fragment>
        </Suspense>
      ) : (
        <Suspense fallback={null} key={mainChild.id}>
          <TheComponent
            key={mainChild.id}
            uid={mainChild.id}
            nodeItem={mainChild}
            idx={idx}
            {...props}
          >
            {renderChildren(mainChild.children)}
          </TheComponent>
        </Suspense>
      );
    });
  };

  // const TheComponent4 = "box" as any;

  return <>{renderChildren(template)}</>;
};
