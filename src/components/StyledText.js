import React from "react";

export default function StyledText({ attributes, children, leaf }) {
  const { color = "black" } = leaf;
  if (leaf.bold) {
    children = (
      <strong style={{ color: color }} {...attributes}>
        {children}
      </strong>
    );
  }

  if (leaf.code) {
    children = (
      <code style={{ color: color }} {...attributes}>
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = (
      <em style={{ color: color }} {...attributes}>
        {children}
      </em>
    );
  }

  if (leaf.underline) {
    children = (
      <u style={{ color: color }} {...attributes}>
        {children}
      </u>
    );
  }

  return (
    <span style={{ color: color }} {...attributes}>
      {children}
    </span>
  );
}
