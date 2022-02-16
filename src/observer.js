let completedCount, itemCount;

function checkProgress() {
  const newCompletedCount = document.querySelectorAll('.completed').length;
  const newItemCount = document.querySelectorAll('.todo').length;

  if (completedCount !== newCompletedCount || itemCount !== newItemCount) {
    completedCount = newCompletedCount;
    itemCount = newItemCount;
    const percentage = ((completedCount / itemCount) * 100 || 0).toFixed(2);
    const progressElem = document.querySelector('.progress-bar');
    const completionElem = document.getElementById('task-completion');
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

  const listElem = document.querySelector('.todo-list');
  const options = {
    attributes: true,
    childList: true,
    subtree: true,
  };

  const observer = new MutationObserver(callback);
  observer.observe(listElem, options);
}

export default startObserver;
