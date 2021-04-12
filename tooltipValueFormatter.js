const FormatValue = (value, decimals = 1, showKDecimals = false) => {
  const roundOff = value => {
    var temp = value.toString();
    let numArray = temp.split(".");
    if (numArray.length > 1 && numArray[1].length > decimals) {
      if (temp.charAt(temp.length - 1) === "5") {
        temp = temp.slice(0, temp.length - 1) + "6";
      }
    }
    return Number(temp);
  };
  if (value) {
    if (value <= 999999) {
      if (value > 9999 && value <= 999999) {
        let num = roundOff(value / 1000);
        return num.toFixed(decimals) + "K";
      } else {
        let num = roundOff(value);
        if ((value || value === 0) && showKDecimals) {
          if (value > 999) {
            return Intl.NumberFormat().format(
              parseFloat(num).toFixed(decimals)
            );
          } else {
            return parseFloat(num).toFixed(decimals);
          }
        } else {
          return Intl.NumberFormat().format(value);
        }
      }
    } else if (value > 999999) {
      if (value <= 999999999) {
        let num = roundOff(value / 1000000);
        return num.toFixed(decimals) + "M";
      } else {
        let num = roundOff(value / 1000000000);
        return num.toFixed(decimals) + "B";
      }
    } else {
      return value;
    }
  } else {
    return (0).toFixed(decimals);
  }
};

export default FormatValue;
