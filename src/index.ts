export type Actions = {
  [key: string]: {
    text: string;
    offset: number;
  };
};

export const defaultActions: Actions = {
  Escape: {
    text: "[]",
    offset: -1,
  },
  EscapeShift: {
    text: "()",
    offset: -1,
  },
  Alt: {
    text: " ",
    offset: 0,
  },
};

export class KakiyasuInput {
  input: HTMLInputElement | null;
  actions: Actions;

  constructor(input: HTMLInputElement, userActions: Actions) {
    this.input = input;
    this.actions = Object.assign(defaultActions, userActions);

    if (this.input === null) {
      throw new Error("Input element not found");
    }

    this.setupEvents();
  }

  setupEvents() {
    this.input?.addEventListener("keydown", this.onKeyUp.bind(this));
  }

  onKeyUp(event: KeyboardEvent) {
    const key = event.key + (event.shiftKey ? "Shift" : "");
    if (!this.actions.hasOwnProperty(key)) {
      return;
    }

    event.preventDefault();

    const action = this.actions[key];
    this.insertTextAtCursor(action.text, action.offset);
  }

  insertTextAtCursor(insertText: string, offset: number) {
    const input = this.input!;
    let value = input.value;
    let endIndex;
    let range;
    let doc = input.ownerDocument;

    // @ts-ignore
    if (typeof doc.selection != "undefined" && doc.selection.createRange) {
      input.focus();
      // @ts-ignore
      range = doc.selection.createRange();
      range.collapse(false);
      range.text = insertText;
      range.select();
      return;
    }

    try {
      endIndex = input.selectionEnd!;
      input.value = [
        value.slice(0, endIndex),
        insertText,
        value.slice(endIndex),
      ].join("");
      input.selectionStart = input.selectionEnd =
        endIndex + insertText.length + offset;
    } catch (err) {
      console.log("Kakiyasu: selection error", err);
    }
  }
}

class Kakiyasu {
  constructor(inputSelector: string, userActions: Actions) {
    const inputs = [].slice.call(document.querySelectorAll(inputSelector));
    const actions = Object.assign(defaultActions, userActions);

    if (inputs.length === 0) {
      console.debug("[Kakiyasu] no inputs found");
    }

    for (let input of inputs) {
      new KakiyasuInput(input, actions);
    }
  }
}

export default Kakiyasu;
