import fixture from "../../fixture";

describe(
  "<get> & <set> self reference",
  fixture("./templates/self-reference.marko")
);

describe(
  "<get> & <set> reference by tag name",
  fixture("./templates/reference-by-tag-name/index.marko")
);

describe(
  "<get> & <set> provide through single child",
  fixture("./templates/provide-direct-child/index.marko")
);

describe(
  "<get> & <set> provide through multiple children",
  fixture("./templates/provide-across-children/index.marko")
);

describe("error <get> args", fixture("./templates/error-get-args.marko"));

describe(
  "error <get> body content",
  fixture("./templates/error-get-body-content.marko")
);

describe(
  "error <get> body parameters",
  fixture("./templates/error-get-body-parameters.marko")
);

describe(
  "error <get> extra attr",
  fixture("./templates/error-get-extra-attr.marko")
);

describe(
  "error <get> missing tag",
  fixture("./templates/error-get-missing-tag.marko")
);

describe(
  "error <get> no default attr",
  fixture("./templates/error-get-no-default-attr.marko")
);

describe(
  "error <get> no tag var",
  fixture("./templates/error-get-no-tag-var.marko")
);
