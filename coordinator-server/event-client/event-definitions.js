class FormalEvent {
    constructor(name) {
        this.name = name;
    }
}

class KeyPressEvent extends FormalEvent {
    constructor(key, code) {
        super("keypress");
        this.key = key;
        this.code = code;
    }
}

class ClickEvent extends FormalEvent {
    constructor(identifier, x, y) {
        super("click");
        this.identifier = identifier;
        this.x = x;
        this.y = y;
    }
}

class ScrollEvent extends FormalEvent {
    constructor(identifier, position) {
        super("scroll");
        this.identifier = identifier;
        this.position = position;
    }
}


class MouseOverEvent extends FormalEvent {
    constructor(identifier, position, size) {
        super("mouseover");
        this.identifier = identifier;
        this.position = position;
        this.size = size;
    }
}

class BeforeUnloadEvent extends FormalEvent {
    constructor() {
        super("beforeunload");
        this.identifier = "buh-bye";
    }
}