import $ from "jquery";

export const Calculator = function (sel) {
  var that = this;
  this.div = $(sel);
  this.errornous = false;

  this.form = this.div.find("#form").html(`
    <form>
      <p class="spread">
        <label for="bill">Bill Amount:</label>
        <input type="text" id="bill" required>
      </p>
      <p class="spread">
        <label for="bill">Tip Percent:</label>
        <input type="number" id="tip" value="20">
      </p>
      <p style="padding-top: 1em">
        <button id="calculate" type="submit"><i class="fas fa-dollar-sign"></i>&nbsp;Calculate</button>
      </p>
    </form>
  `);

  this.form.submit((event) => {
    event.preventDefault();
    if (that.errornous) {
      that.resetErrors();
    }
    that.resetResult();
    that.calculate();
  });

  this.calculate = function () {
    // error checking
    var billAmount = parseFloat($("#bill").val());
    if (isNaN(billAmount)) {
      this.addError("Bill amount must be a number");
      this.errornous = true;
      $("#bill").val("");
    } else if (billAmount <= 0) {
      this.addError("Bill amount must be greater than 0");
      this.errornous = true;
    }

    var tipPercent = $("#tip").val() / 100;
    if (tipPercent < 0) {
      this.addError("Tip percent must be greater than 0");
      this.errornous = true;
    }

    // no errors
    if (!this.errornous) {
      var tipAmount = (billAmount * tipPercent).toFixed(2);
      var totalAmount = (billAmount + parseFloat(tipAmount)).toFixed(2);

      var resultHtml = `
      <div class="spread">
        <p>Tip Amount:</p>
        <p class="value">$${tipAmount}</p>
      </div>
      <div class="spread">
        <p>Total Amount:</p>
        <p class="value">$${totalAmount}</p>
      </div>
      `;

      this.div.find("#result").html(resultHtml);
    }
  };

  this.resetErrors = function () {
    this.errornous = false;
    $("#error-container").empty();
  };

  this.resetForm = function () {
    $("#bill").val("");
    $("#tip").val(20);
  };

  this.resetResult = function () {
    $("#result").empty();
  };

  this.addError = function (msg) {
    var errorMsg = `<p class="error">${msg}</p>`;
    $("#error-container").append(errorMsg);
  };
};
