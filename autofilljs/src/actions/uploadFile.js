// strategies/uploadFile.js

export async function uploadFile(task) {
  const { element, value } = task;
  const response = await fetch(value);

  const blob = await response.blob();

  const file = new File([blob], task.fileName || "file", {
    type: blob.type || "application/octet-stream",
  });

  const dataTransfer = new DataTransfer();

  dataTransfer.items.add(file);

  element.files = dataTransfer.files;

  element.dispatchEvent(
    new Event("change", {
      bubbles: true,
    }),
  );
}
