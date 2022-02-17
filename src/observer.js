// Use MutationObserver interface to watch for changes being made to the DOM
// tree in a specific element and update progress bar if necessary.

let completedCount, itemCount;

function checkProgress() {
  const newCompletedCount = document.querySelectorAll('.completed').length;
  const newItemCount = document.querySelectorAll('.todo').length;

  if (completedCount !== newCompletedCount || itemCount !== newItemCount) {
    completedCount = newCompletedCount;
    itemCount = newItemCount;
    const percentage = ((completedCount / itemCount) * 100 || 0).toFixed(2);
    const progressElem = document.getElementById('completion-bar');
    const completionElem = document.getElementById('completion-info');
    progressElem.style.width = `${percentage}%`;

    if (itemCount) {
      completionElem.innerText = `${completedCount}/${itemCount} (${percentage}%)`;
    } else {
      completionElem.innerText = 'No tasks';
    }
  }
}

function startObserver() {
  const callback = () => {
    checkProgress();
  };

  const listElem = document.getElementById('todo-list');
  const options = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(callback);
  observer.observe(listElem, options);
}

export default startObserver;
