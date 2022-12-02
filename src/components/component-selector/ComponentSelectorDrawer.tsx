import {
  Button,
  ButtonProps,
  createPolymorphicComponent,
  Drawer,
  Space,
  useMantineTheme,
} from "@mantine/core";
import styled from "@emotion/styled";
import { New_Node_Starter } from "../../hooks/useAddNewNode";
interface Component_ListItem {
  name: string;
  short_description?: string;
  long_description?: string;
  template_props: any;
}

const mock_components: Component_ListItem[] = [
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
      dimensions: [5, 5, 5],
      rotation: [0, 0, 0],
    },
  },
  //   { name: "PrismTriangle" },
  //   { name: "LightGeneric" },
];

/////

export interface props {
  component_drawer_open: boolean;
  set_component_drawer_open: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddNode: ({ tagName, template_props }: New_Node_Starter) => void;
}

export const ComponentSelectorDrawer = ({
  component_drawer_open,
  set_component_drawer_open,
  handleAddNode,
}: props) => {
  const theme = useMantineTheme();

  const handle_click_component = (component: Component_ListItem) => {
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
        <>
          <ListButton onClick={() => handle_click_component(component)}>
            {component.name}
          </ListButton>
          <Space h="sm" />
        </>
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
