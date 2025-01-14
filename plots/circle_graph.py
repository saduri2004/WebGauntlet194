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

# num_circles = 5  # Number of concentric circles
# ax.set_rgrids(np.linspace(0, 5, num_circles + 1), labels=None, color="gray", linestyle="solid", linewidth=0.5)


# Draw one line per data group
ax.plot(angles, values_human, linestyle='solid', label='Human', color='blue')
ax.fill(angles, values_human, color='blue', alpha=0.1)

ax.plot(angles, values_o1, linestyle='dashed', label='O1', color='lightblue')
ax.fill(angles, values_o1, color='lightblue', alpha=0.1)

ax.plot(angles, values_o1_safety, linestyle='solid', label='O1 + Safety Prompt', color='lightblue')
ax.fill(angles, values_o1_safety, color='lightblue', alpha=0.1)

ax.plot(angles, values_gpt4, linestyle='dashed', label='GPT4o', color='green')
ax.fill(angles, values_gpt4, color='green', alpha=0.1)

ax.plot(angles, values_gpt4_safety, linestyle='solid', label='GPT4o + Safety Prompt', color='green')
ax.fill(angles, values_gpt4_safety, color='green', alpha=0.1)

ax.plot(angles, values_claude, linestyle='dashed', label='Claude 3.5 Sonnet', color='orange')
ax.fill(angles, values_claude, color='orange', alpha=0.1)

ax.plot(angles, values_claude_safety, linestyle='solid', label='Claude 3.5 Sonnet + Safety Prompt', color='orange')
ax.fill(angles, values_claude_safety, color='orange', alpha=0.1)

# Add repeating thin circle lines
ax.yaxis.grid(True, linestyle='dotted', linewidth=0.5, color='gray')

# Add category labels
ax.set_yticks([])
ax.set_xticks(angles[:-1])
ax.set_xticklabels([])

for angle, label in zip(angles[:-1], categories):
    ax.text(
        angle,  # Angle of the label
        max(max(values_human), max(values_o1), max(values_gpt4), max(values_claude)) + 1.2,  # Distance from the center
        label,
        horizontalalignment='center',
        verticalalignment='center',
        fontsize=12
    )

# Add legend
ax.legend(loc='right', bbox_to_anchor=(1.3, 1.1))

# Show the plot
plt.tight_layout()
plt.show()
