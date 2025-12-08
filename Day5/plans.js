// Using your existing MockAPI project with "plans" resource
const API_URL = "https://69369809f8dc350aff316cab.mockapi.io/plans";

const statusDiv = document.getElementById("status");
const plansContainer = document.getElementById("plansContainer");
const selectedPlanBox = document.getElementById("selectedPlan");
const selectedPlanDetails = document.getElementById("selectedPlanDetails");

async function fetchPlans() {
  try {
    statusDiv.textContent = "Loading plans from server...";

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch plans");
    }

    const plans = await response.json();
    statusDiv.textContent = `Loaded ${plans.length} plans.`;

    displayPlans(plans);
  } catch (error) {
    console.error(error);
    statusDiv.textContent = "Error loading plans. Please check the API and try again.";
  }
}

function displayPlans(plans) {
  plansContainer.innerHTML = "";

  if (!plans.length) {
    plansContainer.innerHTML = '<p class="text-sm text-slate-300">No plans found. Please add some in MockAPI.</p>';
    return;
  }

  plans.forEach((plan) => {
    const card = document.createElement("article");
    card.className =
      "bg-slate-900 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between shadow-lg";

    const header = document.createElement("div");
    header.className = "flex items-baseline justify-between mb-2";
    header.innerHTML = `
      <h3 class="text-xl font-bold text-emerald-400">₹${plan.price}</h3>
      <span class="text-xs px-2 py-1 rounded-full ${plan.type === "prepaid" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-purple-500/20 text-purple-200 border border-purple-500/40"}">
        ${plan.type || "NA"}
      </span>
    `;

    const body = document.createElement("div");
    body.className = "text-sm text-slate-200 space-y-1 mb-3";
    body.innerHTML = `
      <p><span class="text-slate-400">Validity:</span> ${plan.validity}</p>
      <p><span class="text-slate-400">Data:</span> ${plan.data}</p>
      <p class="text-xs text-slate-400 mt-1">${plan.description}</p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Select Plan";
    btn.className =
      "mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-3 py-2 rounded-xl text-xs font-semibold self-start transition";
    btn.addEventListener("click", () => {
      showSelectedPlan(plan);
    });

    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(btn);
    plansContainer.appendChild(card);
  });
}

function showSelectedPlan(plan) {
  selectedPlanBox.classList.remove("hidden");
  selectedPlanDetails.textContent = `You selected a ₹${plan.price} ${plan.type} plan with ${plan.validity} validity and ${plan.data}. Details: ${plan.description}`;
}

fetchPlans();
