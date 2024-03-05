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

const Index = () => {
  const [nodes, setNodes] = useState([
    { id: 1, value: 10, label: "A" },
    { id: 2, value: 20, label: "B" },
    { id: 3, value: 30, label: "C" },
    { id: 4, value: 40, label: "D" },
  ]);
  const [activeNodeId, setActiveNodeId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((currentNodes) =>
        currentNodes
          .map((node) => ({
            ...node,
            value: Math.floor(Math.random() * 100),
          }))
          .sort((a, b) => b.value - a.value),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNodeClick = (id) => {
    setActiveNodeId(activeNodeId === id ? null : id);
  };

  const handleChangeValue = (id, newValue) => {
    setNodes((currentNodes) => currentNodes.map((node) => (node.id === id ? { ...node, value: newValue } : node)).sort((a, b) => b.value - a.value));
  };

  return (
    <HStack spacing={8} p={4}>
      <VStack>
        {nodes.map((node) => (
          <Node key={node.id} node={node} onClick={handleNodeClick} isActive={node.id === activeNodeId} />
        ))}
      </VStack>
      <Info nodes={nodes} />
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
