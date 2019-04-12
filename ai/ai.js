import {createIntelligence, learn, decide} from "../node_modules/qlearn/source/qlearn.js";

const intelligence = createIntelligence();

const actions = ["no", "yes"];
const reduceStateAction = (question, proposal) => `${question}${proposal}`;

const gameSpecificAi = {
    learn: ({possibilities, state, previousAction}) => {
        // could do negative reward for all others
        const stateActions = reduceStateAction(state, previousAction);
        learn(
            intelligence,
            stateActions, stateActions, "yes", actions, 1
            );
    },
    decide:({possibilities, state}) => {
        let finalDecision = possibilities.find((possiblity) => {
            const stateActions = reduceStateAction(state, possiblity);
            const found = decide(intelligence, stateActions, actions) === "yes";
            return found;
        });
        if (finalDecision === undefined) {
            finalDecision = possibilities[0];
        }
        return finalDecision ;
    }
};

window.ai = gameSpecificAi;
window.intelligence = intelligence;
