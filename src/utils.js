function computeTimeAgo(dateString) {
  let date = new Date(dateString);
  let now = new Date();

  let diffMinutes = (now - date) / 1000 / 60;
  let diffHours = diffMinutes / 60;
  let diffDays = diffHours / 24;
  let diffWeeks = diffDays / 7;
  let diffMonths = diffDays / 30;
  let diffYears = diffMonths / 12;
  if (diffMinutes < 1) return "few seconds ago";
  else if (diffMinutes > 1 && diffMinutes < 60)
    return `${Math.floor(diffMinutes)} minutes ago`;
  else if (diffHours > 1 && diffMinutes < 24)
    return `${Math.floor(diffHours)} hours ago`;
  else if (diffDays > 1 && diffDays < 7)
    return `${Math.floor(diffDays)} days ago`;
  else if (diffWeeks > 1 && diffWeeks < 4)
    return `${Math.floor(diffWeeks)} weeks ago`;
  else if (diffMonths > 1 && diffMonths < 12)
    return `${Math.floor(diffMonths)} months ago`;
}

export { computeTimeAgo };
