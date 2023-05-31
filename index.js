const dragSources = document.querySelectorAll('.drag-source');
const dragTarget = document.querySelector('.drag-target');
const dragStorage = document.querySelector('.drag-storage');

// Add event listeners to each drag source element
dragSources.forEach(dragSource => {
  dragSource.addEventListener('dragstart', dragStart);
});

// Prevent default behavior and store the dragged image's data
function dragStart(event) {
  const draggedImage = event.target.querySelector('img');

  if (draggedImage) {
    event.dataTransfer.setData('text/uri-list', draggedImage.src);
  }
}

// Allow dropping on the drag target and handle the dropped image
dragTarget.addEventListener('dragover', dragOver);
dragTarget.addEventListener('drop', drop);

// Prevent default behavior when dragging over the target
function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"; // Set the cursor style during dragover

    // Scroll the drag target div
    const rect = event.target.getBoundingClientRect();
    const scrollOffset = 10; // Set the desired scroll offset 

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseY < scrollOffset) {
      dragTarget.scrollTop -= scrollOffset;

      // Generate place at the top side
      const place = document.createElement('div');
      place.classList.add('drag-place');
      dragStorage.insertBefore(place, dragStorage.firstChild);

      // Increase the height of the drag storage div
      dragStorage.style.height = `${dragStorage.offsetHeight + scrollOffset}px`;
    } else if (mouseY > rect.height - scrollOffset) {
      dragTarget.scrollTop += scrollOffset;

      // Generate place at the bottom side
      const place = document.createElement('div');
      place.classList.add('drag-place');
      dragStorage.appendChild(place);

      // Increase the height of the drag storage div
      dragStorage.style.height = `${dragStorage.offsetHeight + scrollOffset}px`;
    }

    if (mouseX < scrollOffset) {
      dragTarget.scrollLeft -= scrollOffset;

      // Generate place at the left side
      const place = document.createElement('div');
      place.classList.add('drag-place');
      dragStorage.insertBefore(place, dragStorage.firstChild);

      // Increase the width of the drag storage div
      dragStorage.style.width = `${dragStorage.offsetWidth + scrollOffset}px`;
    } else if (mouseX > rect.width - scrollOffset) {
      dragTarget.scrollLeft += scrollOffset;

      // Generate place at the right side
      const place = document.createElement('div');
      place.classList.add('drag-place');
      dragStorage.appendChild(place);

      // Increase the width of the drag storage div
      dragStorage.style.width = `${dragStorage.offsetWidth + scrollOffset}px`;
    }
  }





// Handle the dropped image and append it to the target
function drop(event) {
  event.preventDefault();
  const droppedImage = event.dataTransfer.getData('text/uri-list');

  if (droppedImage) {
    const imgElement = document.createElement('img');
    imgElement.src = droppedImage;
    imgElement.classList.add('dragged-element');

    // Get the drop position relative to the drag target div, accounting for scroll position
    const dropX = event.clientX - dragTarget.getBoundingClientRect().left + dragTarget.scrollLeft;
    const dropY = event.clientY - dragTarget.getBoundingClientRect().top + dragTarget.scrollTop;

    // Position the dropped image using absolute positioning within the drag target div
    imgElement.style.position = 'absolute';
    imgElement.style.left = dropX + 'px';
    imgElement.style.top = dropY + 'px';

    // Append the dropped image to the target div
    dragTarget.appendChild(imgElement);

    // Make the drag target div scrollable if the dropped image is placed outside
    const targetRect = dragTarget.getBoundingClientRect();
    const droppedRect = imgElement.getBoundingClientRect();

    if (droppedRect.right > targetRect.right || droppedRect.bottom > targetRect.bottom) {
      dragTarget.style.overflow = 'auto';
    }

    // Scroll the drag target div to the dropped image position
    const scrollX = dropX - targetRect.left;
    const scrollY = dropY - targetRect.top;
    dragTarget.scrollTo(scrollX, scrollY);
  }
}







// okay code without 2nd drag

// const dragSources = document.querySelectorAll('.drag-source');
// const dragTarget = document.querySelector('.drag-target');
// const dragStorage = document.querySelector('.drag-storage');

// // Add event listeners to each drag source element
// dragSources.forEach(dragSource => {
//   dragSource.addEventListener('dragstart', dragStart);
// });

// // Prevent default behavior and store the dragged image's data
// function dragStart(event) {
//   const draggedImage = event.target.querySelector('img');

//   if (draggedImage) {
//     event.dataTransfer.setData('text/uri-list', draggedImage.src);
//   }
// }

// // Allow dropping on the drag target and handle the dropped image
// dragTarget.addEventListener('dragover', dragOver);
// dragTarget.addEventListener('drop', drop);

// // Prevent default behavior when dragging over the target
// function dragOver(event) {
//   event.preventDefault();
//   event.dataTransfer.dropEffect = "move"; // Set the cursor style during dragover

//   // Scroll the drag target div
//   const rect = event.target.getBoundingClientRect();
//   const scrollOffset = 10; // Set the desired scroll offset

//   if (event.clientY < rect.top + scrollOffset) {
//     dragTarget.scrollTop -= scrollOffset;
//   } else if (event.clientY > rect.bottom - scrollOffset) {
//     dragTarget.scrollTop += scrollOffset;
//   }
// }

// // Handle the dropped image and append it to the target
// function drop(event) {
//   event.preventDefault();
//   const droppedImage = event.dataTransfer.getData('text/uri-list');

//   if (droppedImage) {
//     const imgElement = document.createElement('img');
//     imgElement.src = droppedImage;
//     imgElement.classList.add('dragged-element');

//     // Get the drop position
//     const dropX = event.clientX - dragTarget.getBoundingClientRect().left;
//     const dropY = event.clientY - dragTarget.getBoundingClientRect().top;

//     // Determine the drop position relative to the target div's scroll position
//     const scrollLeft = dragTarget.scrollLeft;
//     const scrollTop = dragTarget.scrollTop;
//     const droppedX = dropX + scrollLeft;
//     const droppedY = dropY + scrollTop;

//     // Position the dropped image using absolute positioning
//     imgElement.style.position = 'absolute';
//     imgElement.style.left = droppedX + 'px';
//     imgElement.style.top = droppedY + 'px';

//     // Append the dropped image to the target div
//     dragTarget.appendChild(imgElement);

//     // Make the drag target div scrollable if the dropped image is placed outside
//     const targetRect = dragTarget.getBoundingClientRect();
//     const droppedRect = imgElement.getBoundingClientRect();

//     if (droppedRect.right > targetRect.right || droppedRect.bottom > targetRect.bottom) {
//       dragTarget.style.overflow = 'auto';
//     }

//     // Scroll the drag target div to the dropped image position
//     const scrollX = droppedX - targetRect.left;
//     const scrollY = droppedY - targetRect.top;
//     dragTarget.scrollTo(scrollX, scrollY);
//   }
// }




// problem code with 2nd dragable



// const dragSources = document.querySelectorAll('.drag-source');
// const dragTarget = document.querySelector('.drag-target');
// const dragStorage = document.querySelector('.drag-storage');

// let draggedElement = null; // Track the currently dragged element

// // Add event listeners to each drag source element
// dragSources.forEach(dragSource => {
//   dragSource.setAttribute('draggable', 'true'); // Add draggable attribute to enable dragging
//   dragSource.addEventListener('dragstart', dragStart);
// });

// // Prevent default behavior and store the dragged image's data
// function dragStart(event) {
//   const draggedImage = event.target.querySelector('img');

//   if (draggedImage) {
//     event.dataTransfer.setData('text/uri-list', draggedImage.src);
//     draggedElement = draggedImage.cloneNode(true); // Create a clone of the dragged element
//     draggedElement.classList.add('dragged-element'); // Add a class for styling and identification
//   }
// }

// // Allow dropping on the drag target and handle the dropped image
// dragTarget.addEventListener('dragover', dragOver);
// dragTarget.addEventListener('drop', drop);

// // Prevent default behavior when dragging over the target
// function dragOver(event) {
//   event.preventDefault();
//   event.dataTransfer.dropEffect = "move"; // Set the cursor style during dragover

//   // Scroll the drag target div
//   const rect = event.target.getBoundingClientRect();
//   const scrollOffset = 10; // Set the desired scroll offset

//   if (event.clientY < rect.top + scrollOffset) {
//     dragTarget.scrollTop -= scrollOffset;
//   } else if (event.clientY > rect.bottom - scrollOffset) {
//     dragTarget.scrollTop += scrollOffset;
//   }
// }

// // Handle the dropped image and append it to the target
// function drop(event) {
//   event.preventDefault();
//   const droppedImage = event.dataTransfer.getData('text/uri-list');

//   if (droppedImage && draggedElement) {
//     const imgElement = draggedElement;
//     draggedElement = null; // Reset the dragged element

//     // Get the drop position
//     const dropX = event.clientX - dragTarget.getBoundingClientRect().left;
//     const dropY = event.clientY - dragTarget.getBoundingClientRect().top;

//     // Determine the drop position relative to the target div's scroll position
//     const scrollLeft = dragTarget.scrollLeft;
//     const scrollTop = dragTarget.scrollTop;
//     const droppedX = dropX + scrollLeft;
//     const droppedY = dropY + scrollTop;

//     // Position the dropped image using absolute positioning
//     imgElement.style.position = 'absolute';
//     imgElement.style.left = droppedX + 'px';
//     imgElement.style.top = droppedY + 'px';

//     // Make the dropped image draggable within the target
//     imgElement.addEventListener('mousedown', startDragging);

//     // Append the dropped image to the target div
//     dragTarget.appendChild(imgElement);

//     // Make the drag target div scrollable if the dropped image is placed outside
//     const targetRect = dragTarget.getBoundingClientRect();
//     const droppedRect = imgElement.getBoundingClientRect();

//     if (droppedRect.right > targetRect.right || droppedRect.bottom > targetRect.bottom) {
//       dragTarget.style.overflow = 'auto';
//     }

//     // Scroll the drag target div to the dropped image position
//     const scrollX = droppedX - targetRect.left;
//     const scrollY = droppedY - targetRect.top;
//     dragTarget.scrollTo(scrollX, scrollY);
//   }
// }

// // Make the dragged images draggable within the drag target
// function startDragging(event) {
//   const target = event.target;
//   target.style.zIndex = '9999';

//   const initialX = event.clientX - target.offsetLeft;
//   const initialY = event.clientY - target.offsetTop;

//   function moveElement(event) {
//     const newX = event.clientX - initialX;
//     const newY = event.clientY - initialY;

//     target.style.left = newX + 'px';
//     target.style.top = newY + 'px';
//   }

//   function stopDragging() {
//     target.style.zIndex = '';
//     document.removeEventListener('mousemove', moveElement);
//     document.removeEventListener('mouseup', stopDragging);
//   }

//   document.addEventListener('mousemove', moveElement);
//   document.addEventListener('mouseup', stopDragging);
// }
