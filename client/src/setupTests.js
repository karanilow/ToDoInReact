// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import Adapter from "enzyme-adapter-react-16";
import { configure as configureEnzyme } from "enzyme";
import createChaiEnzyme from "chai-enzyme";
import chai from "chai";
import dirtyChai from "dirty-chai";
import sinonChai from "sinon-chai";
import chaiJestSnapshot from "chai-jest-snapshot";
import enzymeToJSON from "enzyme-to-json/serializer";

chai
  .use(dirtyChai)
  .use(createChaiEnzyme())
  .use(sinonChai)
  .use(chaiJestSnapshot);

expect.addSnapshotSerializer(enzymeToJSON);
configureEnzyme({ adapter: new Adapter() });
