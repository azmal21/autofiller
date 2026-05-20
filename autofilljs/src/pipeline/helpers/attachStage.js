export function attachStage(field, stage, data) {
  return {
    ...field,
    [stage]: data,
  };
}
