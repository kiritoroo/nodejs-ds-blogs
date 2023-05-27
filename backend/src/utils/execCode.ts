const execCode = (code: string): string[] => {
  const outputStream = {
    result: [],
    write: function (text: string) {
      (this.result as string[]).push(text);
    }
  };

  const originalConsoleLog = console.log;
  console.log = outputStream.write.bind(outputStream);

  try {
    eval(code);
  } catch (error) {
    console.error('Error:', "Error code");
    return ["Error code"];
  }

  console.log = originalConsoleLog;

  return outputStream.result;
};

export default execCode;