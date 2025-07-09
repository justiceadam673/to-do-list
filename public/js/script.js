document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      if (confirm("Are you sure you want to delete this item?")) {
        fetch("/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: index,
            listTitle: document.querySelector("h1").textContent,
          }),
        }).then((response) => {
          if (response.ok) {
            window.location.reload();
          }
        });
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      const listItem = this.closest(".list");
      const itemText = listItem.querySelector(".item-text");
      const currentText = itemText.textContent.trim();

      const input = document.createElement("input");
      input.type = "text";
      input.className = "edit-input";
      input.value = currentText;

      const saveButton = document.createElement("button");
      saveButton.className = "save-btn";
      saveButton.textContent = "👌";

      itemText.replaceWith(input);
      this.replaceWith(saveButton);

      input.focus();

      saveButton.addEventListener("click", function () {
        const newText = input.value.trim();
        if (newText) {
          fetch("/edit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              index: index,
              newText: newText,
              listTitle: document.querySelector("h1").textContent,
            }),
          }).then((response) => {
            if (response.ok) {
              window.location.reload();
            }
          });
        }
      });

      input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          saveButton.click();
        }
      });
    });
  });
});
