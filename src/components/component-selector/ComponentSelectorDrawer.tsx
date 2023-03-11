import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Drawer,
  Space,
  useMantineTheme,
} from "@mantine/core";
import styled from "@emotion/styled";
import { Fragment } from "react";
import { useSendNodeUpdate } from "../../hooks/useSendNodeUpdate";
interface Component_ListItem {
  name: string;
  short_description?: string;
  long_description?: string;
  template_props: any;
  component_name?: string;
  display_name?: string;
}

const mock_components: Component_ListItem[] = [
  // should replace with dybamic list of components
  {
    name: "GenericBox",
    template_props: {
      color: "lightblue",
      position: [0, 0, 0],
      dimensions: [5, 5, 5],
      rotation: [0, 0, 0],
    },
  },
  {
    name: "PlaneGeneric",
    template_props: {
      color: "lightblue",
      position: [0, 0, 0],
      dimensions: [5, 5],
      // rotation: [0, 0, 0],
    },
  },
  //   { name: "PrismTriangle" },
  {
    name: "DirectionalLight",
    template_props: { position: [10, 15, 10] },
  },
  {
    name: "PrismTriangle",
    template_props: {
      color: "orange",
      position: [0, 0, 0],
      bottomBack_depthHeight: [0, 0],
      bottomFront_depthHeight: [5, 0],
      topBack_depthHeight: [0, 5],
      rotation: [0, 0, 0],
    },
  },
  {
    name: "TestCharacter",
    template_props: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      // these should be part of the component, to read from
    },
  },
  {
    name: "ThirdPersonCharacter",
    display_name: "Third Person Character",
    component_name: "ThirdPersonCharacter",
    template_props: {
      position: [0, 4.1, 0],
      rotation: [0, 0, 0],
    },
  },
];

/////

export interface props {
  component_drawer_open: boolean;
  set_component_drawer_open: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComponentSelectorDrawer = ({
  component_drawer_open,
  set_component_drawer_open,
}: props) => {
  const theme = useMantineTheme();

  const { handleAddNode } = useSendNodeUpdate();

  const handle_click_component = (component: Component_ListItem) => {
    // works like this because components are added from a list of components
    handleAddNode({
      tagName: component.name,
      template_props: component.template_props,
    });
    set_component_drawer_open(false);
  };

  return (
    <DrawerContainer
      //   size={400}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={component_drawer_open}
      onClose={() => set_component_drawer_open(false)}
    >
      {mock_components.map((component) => (
        <Fragment key={component.name}>
          <ListButton onClick={() => handle_click_component(component)}>
            {component.name}
          </ListButton>
          <Space h="sm" />
        </Fragment>
      ))}
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  .mantine-Drawer-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: red; */
  }
`;

export const _ListButton = styled(Button)`
  margin: 0 10px;
  height: 50px;
`;
const ListButton = createPolymorphicComponent<"button", ButtonProps>(
  _ListButton
);
