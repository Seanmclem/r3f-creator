import { Card, Code, Group, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import {
  current_history_item_INDEX,
  history_list,
} from "../../signals-state/history-signals";

interface props {}

export const HistoryViewer: React.FC<props> = () => {
  //   const history_list = useHistoryStore((state) => state.history_list);
  //   const current_history_item_index = useHistoryStore(
  //     (state) => state.current_history_item_index
  //   );

  return (
    <Container>
      <SimpleGrid cols={1}>
        <Card shadow="sm" p="lg" radius="md" withBorder m={10}>
          <Group>
            <Text weight={"bold"}>Current Item Index: </Text>
            <Text>{current_history_item_INDEX.value}</Text>
          </Group>
        </Card>
        {history_list.value.map((history_item, idx) => {
          return (
            <Card
              shadow="sm"
              p="lg"
              radius="md"
              withBorder
              m={10}
              sx={{
                backgroundColor:
                  idx === current_history_item_INDEX.value
                    ? "lightblue"
                    : "white",
              }}
            >
              <Group>
                <Text weight={"bold"}>Action: </Text>
                <Text>{history_item.action}</Text>
              </Group>
              <Group>
                <Text weight={"bold"}>Index: </Text>
                <Text>{idx} </Text>
              </Group>
              <Group>
                <Text weight={"bold"}>Path: </Text>
                <Text>{history_item.path} </Text>
              </Group>
              <Text sx={{ whiteSpace: "pre-wrap" }}>
                <Text weight="bold">New Value: </Text>
                {/* <Code lang="javascript"> */}
                <Text sx={{ marginLeft: 10 }}>
                  {(history_item.newValue as any)?.tagName ||
                  history_item.newValue
                    ? JSON.stringify(history_item.newValue, (k, v) =>
                        v === undefined ? "_undefined__" : v
                      )
                        .replaceAll("_undefined__", "undefined")
                        .replaceAll("{", "{\n  ")
                        .replaceAll("}", "\n}")
                        .replaceAll(",", ",\n  ")
                    : "N/A"}
                </Text>

                {/* </Code> */}
              </Text>
              <Text sx={{ whiteSpace: "pre-wrap" }}>
                <Text weight="bold">Previous Value: </Text>
                <Text sx={{ marginLeft: 10 }}>
                  {history_item.previousValue
                    ? JSON.stringify(history_item.previousValue, (k, v) =>
                        v === undefined ? "_undefined__" : v
                      )
                        .replaceAll("_undefined__", "undefined")
                        .replaceAll("{", "{\n  ")
                        .replaceAll("}", "\n}")
                        .replaceAll(",", ",\n  ")
                    : "N/A"}
                </Text>
              </Text>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px;
  overflow: scroll;
  background-color: lightgray;
  z-index: 1000;
  margin-top: 35px;
`;
