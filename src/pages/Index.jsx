import React, { useState, useEffect } from "react";
import { Box, Flex, Circle, Text, VStack, HStack, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

const Node = ({ node, onClick, isActive }) => {
  return (
    <Circle size="50px" bg={isActive ? "blue.200" : "gray.200"} onClick={() => onClick(node.id)} cursor="pointer" mb={2}>
      <Text>{node.value}</Text>
    </Circle>
  );
};

const Info = ({ nodes }) => {
  return (
    <VStack align="start" spacing={4}>
      {nodes.map((node) => (
        <HStack key={node.id}>
          <Text fontWeight="bold">{`Node ${node.label}: `}</Text>
          <Text>{node.value}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

const MAX_RUNS = 5;

const Index = () => {
  const [nodes, setNodes] = useState([
    { id: 1, value: 10, label: "A" },
    { id: 2, value: 20, label: "B" },
    { id: 3, value: 30, label: "C" },
    { id: 4, value: 40, label: "D" },
  ]);
  const [timeline, setTimeline] = useState([[]]);
  const [activeNodeId, setActiveNodeId] = useState(null);

  useEffect(() => {
    if (timeline.length <= MAX_RUNS) {
      const interval = setInterval(() => {
        setTimeline((currentTimeline) => {
          const newTimeline = [...currentTimeline];
          if (newTimeline.length === 0 || newTimeline[newTimeline.length - 1].length > 0) {
            newTimeline.push([...nodes]);
          }
          return newTimeline;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [nodes, timeline]);

  const handleChangeValue = (id, newValue) => {
    setNodes((currentNodes) => currentNodes.map((node) => (node.id === id ? { ...node, value: newValue } : node)));
  };

  const handleNodeClick = (id) => {
    setActiveNodeId(activeNodeId === id ? null : id);
    if (id !== null) {
      setTimeline((currentTimeline) => {
        const newTimeline = currentTimeline.map((run, index) => {
          if (index === currentTimeline.length - 1) {
            return run.map((node) => (node.id === id ? { ...node, value: nodes.find((n) => n.id === id).value } : node));
          }
          return run;
        });
        return newTimeline;
      });
    }
  };

  return (
    <HStack spacing={8} p={4}>
      <VStack>{timeline.length > 0 && timeline[timeline.length - 1].map((node) => <Node key={node.id} node={node} onClick={handleNodeClick} isActive={node.id === activeNodeId} />)}</VStack>
      <Info nodes={timeline.length > 0 ? timeline[timeline.length - 1] : []} />
      {activeNodeId != null && (
        <Box>
          <Text mb={4}>Change Node Value:</Text>
          <NumberInput defaultValue={nodes.find((node) => node.id === activeNodeId).value} min={0} onChange={(valueString) => handleChangeValue(activeNodeId, parseInt(valueString))}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      )}
    </HStack>
  );
};

export default Index;
