import matplotlib.pyplot as plt
import numpy as np

# Define the categories (axes labels) and data
categories = ['Base ASR', 'Task Completion', 'Realistic ASR', 'Agent ASR']
values_human = [0.1, 5, 0.3, 0.12]
values_o1 = [3, 0.3, 3, 4.3]
values_gpt4 = [4, 0.5, 4, 4.9]
values_claude = [4.5, 1.3, 4, 4.8]
values_o1_safety = [2, 0.3, 2, 3.3]
values_gpt4_safety = [3, 0.5, 3, 3.9]
values_claude_safety = [3.5, 1.3, 3, 3.8]

# Add the first value again to close the circle
values_human += values_human[:1]
values_o1 += values_o1[:1]
values_gpt4 += values_gpt4[:1]
values_claude += values_claude[:1]
values_o1_safety += values_o1_safety[:1]
values_gpt4_safety += values_gpt4_safety[:1]
values_claude_safety += values_claude_safety[:1]

# Compute the angles for the categories (adjusted positions)
angles = [np.pi / 4, 3 * np.pi / 4, 5 * np.pi / 4, 7 * np.pi / 4]
angles += angles[:1]

# Initialize the radar plot
fig, ax = plt.subplots(figsize=(8, 8), subplot_kw=dict(polar=True))

# Draw one line per data group
ax.plot(angles, values_human, linestyle='solid', label='Human', color='blue', zorder=3)
ax.fill(angles, values_human, color='blue', alpha=0.1, zorder=2)

ax.plot(angles, values_o1, linestyle='dashed', label='O1', color='lightblue', zorder=3)
ax.fill(angles, values_o1, color='lightblue', alpha=0.1, zorder=2)

ax.plot(angles, values_o1_safety, linestyle='solid', label='O1 + Safety Prompt', color='cyan', zorder=3)
ax.fill(angles, values_o1_safety, color='cyan', alpha=0.1, zorder=2)

ax.plot(angles, values_gpt4, linestyle='dashed', label='GPT4o', color='green', zorder=3)
ax.fill(angles, values_gpt4, color='green', alpha=0.1, zorder=2)

ax.plot(angles, values_gpt4_safety, linestyle='solid', label='GPT4o + Safety Prompt', color='lime', zorder=3)
ax.fill(angles, values_gpt4_safety, color='lime', alpha=0.1, zorder=2)

ax.plot(angles, values_claude, linestyle='dashed', label='Claude 3.5 Sonnet', color='orange', zorder=3)
ax.fill(angles, values_claude, color='orange', alpha=0.1, zorder=2)

ax.plot(angles, values_claude_safety, linestyle='solid', label='Claude 3.5 Sonnet + Safety Prompt', color='gold', zorder=3)
ax.fill(angles, values_claude_safety, color='gold', alpha=0.1, zorder=2)

# Set the radial limits
ax.set_ylim(0, 5)

# Customize the gridlines without labels
# Using set_rgrids with labels set to empty strings to hide them
ax.set_rgrids([1, 2, 3, 4, 5], labels=[""]*5, angle=0, fontsize=10, color='gray')

# Adjust gridline properties for better visibility
ax.grid(True, linestyle='solid', linewidth=1, color='gray', zorder=1)

# Remove y-tick labels to ensure no labels on gridlines
ax.set_yticklabels([])

# Add category labels back to the same positions as the original code
ax.set_xticks(angles[:-1])
ax.set_xticklabels([])  # We'll add custom labels manually

# Add custom labels with proper alignment
for angle, label in zip(angles[:-1], categories):
    angle_deg = np.degrees(angle)
    if angle_deg == 0 or angle_deg == 180:
        ha = 'center'
    elif 90 < angle_deg < 270:
        ha = 'right'
    else:
        ha = 'left'
    ax.text(
        angle,
        5.1,  # Slightly outside the max radius
        label,
        horizontalalignment=ha,
        verticalalignment='center',
        fontsize=12,
    )

# Add legend
ax.legend(loc='right', bbox_to_anchor=(1.3, 1.1))

# Improve layout
plt.tight_layout()

# Show the plot
plt.show()
